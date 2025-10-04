import { Card } from '@/components/ui/card';

export default function GameCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-card/50 border-border/50">
      <div className="aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>
      
      <div className="p-3 sm:p-4 space-y-3">
        <div className="h-5 sm:h-6 bg-muted/50 rounded-md w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer"></div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted/50 rounded relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
          <div className="h-4 bg-muted/50 rounded w-20 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          <div className="h-6 sm:h-7 bg-muted/50 rounded-md w-24 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
          <div className="h-4 bg-muted/50 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="h-9 sm:h-10 bg-muted/50 rounded-md flex-1 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
          <div className="h-9 sm:h-10 w-9 sm:w-10 bg-muted/50 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}