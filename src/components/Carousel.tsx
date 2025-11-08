import { ReactNode } from 'react';

type Props = {
  itemWidth: number;
  visibleCount: number;
  index: number;
  children: ReactNode;
};

export default function Carousel({ itemWidth, visibleCount, index, children }: Props) {
  const containerWidth = itemWidth * visibleCount;
  const translateX = -(index * itemWidth) + (containerWidth / 2 - itemWidth / 2);

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-2xl bg-white shadow-xl border border-stone-200"
      style={{ width: containerWidth }}
    >
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {children}
      </div>
    </div>
  );
}