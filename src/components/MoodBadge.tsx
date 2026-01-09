import { Mood } from '@/types';
import { cn } from '@/lib/utils';
import { 
  Sun, 
  Cloud, 
  Zap, 
  CloudRain, 
  Smile, 
  Flame 
} from 'lucide-react';

interface MoodBadgeProps {
  mood: Mood;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const moodConfig: Record<Mood, { label: string; icon: typeof Sun; colorClass: string }> = {
  calm: { label: 'Calm', icon: Sun, colorClass: 'bg-mood-calm/20 text-mood-calm border-mood-calm/30' },
  anxious: { label: 'Anxious', icon: Cloud, colorClass: 'bg-mood-anxious/20 text-mood-anxious border-mood-anxious/30' },
  motivated: { label: 'Motivated', icon: Zap, colorClass: 'bg-mood-motivated/20 text-mood-motivated border-mood-motivated/30' },
  sad: { label: 'Sad', icon: CloudRain, colorClass: 'bg-mood-sad/20 text-mood-sad border-mood-sad/30' },
  happy: { label: 'Happy', icon: Smile, colorClass: 'bg-mood-happy/20 text-mood-happy border-mood-happy/30' },
  frustrated: { label: 'Frustrated', icon: Flame, colorClass: 'bg-mood-frustrated/20 text-mood-frustrated border-mood-frustrated/30' },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

const iconSizes = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function MoodBadge({ mood, size = 'md', showLabel = true, className }: MoodBadgeProps) {
  const config = moodConfig[mood];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        config.colorClass,
        sizeClasses[size],
        className
      )}
    >
      <Icon size={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
