import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface ShimmerProps extends HTMLAttributes<HTMLDivElement> {
}

export function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded",
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Shimmer className="h-4 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
      <Shimmer className="h-8 w-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="p-6 border border-border rounded-lg bg-card space-y-3">
      <div className="flex items-center justify-between">
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-4 w-4 rounded" />
      </div>
      <Shimmer className="h-8 w-24" />
      <Shimmer className="h-3 w-32" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-6 border border-border rounded-lg bg-card">
      <div className="space-y-4">
        <Shimmer className="h-6 w-32" />
        <div className="h-64 flex items-end space-x-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Shimmer 
              key={i} 
              className="flex-1 rounded-t" 
              style={{ height: `${Math.random() * 200 + 50}px` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Shimmer className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-3 w-24" />
      </div>
      <Shimmer className="h-6 w-16" />
      <Shimmer className="h-8 w-20" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      
      <ChartSkeleton />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Shimmer className="h-8 w-32" />
        <div className="flex space-x-2">
          <Shimmer className="h-10 w-32" />
          <Shimmer className="h-10 w-20" />
        </div>
      </div>
      
      <div className="border border-border rounded-lg bg-card">
        <div className="p-4 border-b border-border">
          <Shimmer className="h-10 w-full max-w-sm" />
        </div>
        
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}