'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = 'w-full h-4' }: SkeletonProps) {
  return (
    <div className={`bg-bg-tertiary rounded-lg animate-skeleton ${className}`} />
  );
}
