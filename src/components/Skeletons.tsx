"use client";

export const Skeleton = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div 
    className={`animate-pulse bg-surface2 border border-border/50 rounded-sm ${className || ""}`} 
    style={style} 
  />
);

export const NewsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-surface border border-border p-6 flex flex-col h-full">
        <div className="flex justify-between mb-4">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Skeleton className="w-full h-6 mb-3" />
        <Skeleton className="w-3/4 h-6 mb-4" />
        <div className="space-y-2 mb-6">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-1/2 h-3" />
        </div>
        <div className="mt-auto pt-4 border-t border-border flex justify-between">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-20 h-6" />
        </div>
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-surface border border-border p-6 rounded-sm h-[400px] flex flex-col">
    <div className="flex items-center gap-3 mb-8">
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-32 h-4" />
    </div>
    <div className="flex-1 flex items-end gap-2 px-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 60 + 20}%` }} />
      ))}
    </div>
    <div className="mt-6 flex justify-between px-4">
      {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="w-12 h-3" />)}
    </div>
  </div>
);
