import { Note } from '@/types';
import { MoodBadge } from './MoodBadge';
import { TriggerBadge } from './TriggerBadge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
  className?: string;
  index?: number;
}

export function NoteCard({ note, onClick, className, index = 0 }: NoteCardProps) {
  const successRate = note.timesTriggered > 0 
    ? Math.round((note.timesFollowed / note.timesTriggered) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card
        className={cn(
          'group cursor-pointer p-5 transition-all duration-300',
          'hover:shadow-elevated hover:-translate-y-1',
          'border-border/50 bg-card',
          className
        )}
        onClick={onClick}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg font-medium leading-tight text-foreground group-hover:text-primary transition-colors">
              {note.title}
            </h3>
            {note.mood && <MoodBadge mood={note.mood} size="sm" showLabel={false} />}
          </div>

          {/* Message preview */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {note.message}
          </p>

          {/* Triggers */}
          {note.triggers.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {note.triggers.slice(0, 2).map((trigger) => (
                <TriggerBadge 
                  key={trigger.id} 
                  type={trigger.type} 
                  label={trigger.label} 
                />
              ))}
              {note.triggers.length > 2 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{note.triggers.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Footer stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare size={12} />
                {note.timesTriggered} triggers
              </span>
              {note.timesTriggered > 0 && (
                <span className="flex items-center gap-1 text-success">
                  <TrendingUp size={12} />
                  {successRate}% followed
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
