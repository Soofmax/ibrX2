import { useEffect } from 'react';

type Props = {
  title: string;
  description?: string;
};

export default function SEO({ title, description }: Props) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    if (meta) meta.setAttribute('content', description || '');
  }, [title, description]);

  return null;
}