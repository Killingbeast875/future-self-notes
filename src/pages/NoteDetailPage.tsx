import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { MoodBadge } from '@/components/MoodBadge';
import { TriggerBadge } from '@/components/TriggerBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Trash2, 
  Edit2,
  MessageSquare,
  TrendingUp,
  Clock,
  Quote
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, deleteNote } = useAppStore();

  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <div className="px-4 pt-12 pb-8 text-center">
        <p className="text-muted-foreground">Note not found</p>
        <Button variant="ghost" onClick={() => navigate('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  const successRate = note.timesTriggered > 0 
    ? Math.round((note.timesFollowed / note.timesTriggered) * 100) 
    : 0;

  const handleDelete = () => {
    deleteNote(note.id);
    navigate('/');
  };

  return (
    <div className="px-4 pt-6 pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="shrink-0"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon">
          <Edit2 size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
        >
          <Trash2 size={18} />
        </Button>
      </motion.header>

      <div className="space-y-6">
        {/* Title and mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="font-serif text-2xl font-semibold text-foreground leading-tight">
              {note.title}
            </h1>
            {note.mood && <MoodBadge mood={note.mood} size="md" />}
          </div>
          <p className="text-sm text-muted-foreground">
            Created {formatDistanceToNow(note.createdAt, { addSuffix: true })}
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-5 bg-card border-border/50">
            <div className="flex gap-3">
              <Quote size={20} className="text-primary shrink-0 mt-0.5" />
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {note.message}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Reason */}
        {note.reason && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Why you wrote this
            </p>
            <p className="text-sm text-muted-foreground italic">
              "{note.reason}"
            </p>
          </motion.div>
        )}

        {/* Triggers */}
        {note.triggers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Triggers
            </p>
            <div className="flex flex-wrap gap-2">
              {note.triggers.map((trigger) => (
                <TriggerBadge 
                  key={trigger.id} 
                  type={trigger.type} 
                  label={trigger.label} 
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Effectiveness
          </p>
          <Card className="p-4 bg-card border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare size={14} />
                <span>Times triggered</span>
              </div>
              <span className="font-medium text-foreground">{note.timesTriggered}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp size={14} />
                <span>Advice followed</span>
              </div>
              <span className="font-medium text-success">{note.timesFollowed}</span>
            </div>

            {note.timesTriggered > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Success rate</span>
                  <span className="font-medium text-foreground">{successRate}%</span>
                </div>
                <Progress value={successRate} className="h-2" />
              </div>
            )}
          </Card>
        </motion.div>

        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="pt-4"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>Last updated {format(note.updatedAt, 'MMM d, yyyy')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
