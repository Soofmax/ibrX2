/**
 * Storage utilities for rate limiting and webhook idempotency.
 * Prefer durable Upstash Redis (via REST) when configured, otherwise fallback to in-memory Maps.
 *
 * Env:
 *  - UPSTASH_REDIS_REST_URL
 *  - UPSTASH_REDIS_REST_TOKEN
 */

type UpstashResult = { result?: unknown } | Array<{ result?: unknown }>;

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const hasUpstash = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

/**
 * Perform an Upstash REST pipeline request.
 * See: https://docs.upstash.com/redis/features/pipeline#rest-api
 */
async function upstashPipeline(commands: (string | number)[][]): Promise<UpstashResult> {
  const url = `${UPSTASH_URL}/pipeline`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) {
    throw new Error(`Upstash pipeline error: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/**
 * Perform a single Upstash command.
 */
async function upstashCmd(command: (string | number)[]): Promise<UpstashResult> {
  const url = `${UPSTASH_URL}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) {
    throw new Error(`Upstash cmd error: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/**
 * In-memory fallbacks (per instance).
 */
const rlBuckets = new Map<string, { count: number; resetAt: number }>();
const seenEvents = new Map<string, number>();

/**
 * Return true if the IP is rate limited (over max within windowSeconds).
 */
export async function rateLimit(ip: string | null, windowSeconds: number, max: number): Promise<boolean> {
  if (!ip) return false;

  if (hasUpstash) {
    // INCR key and EXPIRE key windowSeconds (set TTL)
    const key = `rl:${ip}`;
    try {
      const resp = (await upstashPipeline([
        ['INCR', key],
        ['EXPIRE', key, windowSeconds],
      ])) as Array<{ result?: number | string }>;
      const first = resp?.[0];
      const count = typeof first?.result === 'number' ? first.result : Number(first?.result ?? 0);
      return count > max;
    } catch {
      // On failure, do not block — fall back to in-memory below
    }
  }

  const now = Date.now();
  const bucket = rlBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rlBuckets.set(ip, { count: 1, resetAt: now + windowSeconds * 1000 });
    return false;
  }
  bucket.count += 1;
  rlBuckets.set(ip, bucket);
  return bucket.count > max;
}

/**
 * Mark an event id as seen with TTL and return whether it's a duplicate.
 * Returns true if the event has already been processed recently, else false and marks it as seen.
 */
export async function seenRecently(id?: string | null, ttlSeconds: number = 600): Promise<boolean> {
  if (!id) return false;

  if (hasUpstash) {
    // SET key 1 EX ttl NX (only if not exists)
    const key = `wh:${id}`;
    try {
      const resp = (await upstashCmd(['SET', key, '1', 'EX', ttlSeconds, 'NX'])) as { result?: string | null };
      // If result is null => key already exists => duplicate
      return resp?.result === null;
    } catch {
      // On failure, fall back to in-memory
    }
  }

  const now = Date.now();
  const seenAt = seenEvents.get(id);
  if (seenAt && now - seenAt < ttlSeconds * 1000) {
    return true;
  }
  seenEvents.set(id, now);
  return false;
}