import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  index?: number;
}

export function StatCard({ 
  label, 
  value, 
  subtitle, 
  icon, 
  trend,
  className,
  index = 0 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn(
        'rounded-xl bg-card p-4 shadow-card border border-border/50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="font-serif text-2xl font-semibold text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              'text-xs',
              trend === 'up' && 'text-success',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground',
              !trend && 'text-muted-foreground'
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
