import { TriggerType } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Smartphone, 
  Clock, 
  MapPin, 
  Monitor, 
  Heart,
  Hand
} from 'lucide-react';

interface TriggerBadgeProps {
  type: TriggerType;
  label: string;
  className?: string;
}

const triggerConfig: Record<TriggerType, { icon: typeof Smartphone; colorClass: string }> = {
  app_usage: { icon: Smartphone, colorClass: 'bg-primary/10 text-primary border-primary/20' },
  time_of_day: { icon: Clock, colorClass: 'bg-accent text-accent-foreground border-accent-foreground/20' },
  location: { icon: MapPin, colorClass: 'bg-secondary text-secondary-foreground border-secondary-foreground/20' },
  screen_time: { icon: Monitor, colorClass: 'bg-warning/20 text-warning-foreground border-warning/30' },
  mood_checkin: { icon: Heart, colorClass: 'bg-destructive/10 text-destructive border-destructive/20' },
  manual: { icon: Hand, colorClass: 'bg-muted text-muted-foreground border-border' },
};

export function TriggerBadge({ type, label, className }: TriggerBadgeProps) {
  const config = triggerConfig[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        config.colorClass,
        className
      )}
    >
      <Icon size={12} />
      <span className="truncate max-w-[150px]">{label}</span>
    </span>
  );
}
