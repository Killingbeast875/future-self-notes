import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { NoteCard } from '@/components/NoteCard';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const { notes } = useAppStore();

  const totalTriggered = notes.reduce((acc, n) => acc + n.timesTriggered, 0);
  const totalFollowed = notes.reduce((acc, n) => acc + n.timesFollowed, 0);
  const successRate = totalTriggered > 0 ? Math.round((totalFollowed / totalTriggered) * 100) : 0;

  return (
    <div className="px-4 pt-12 pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-sm font-medium text-muted-foreground mb-1">Welcome back</p>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Future You
        </h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Messages from your past self, delivered at the right moment.
        </p>
      </motion.header>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatCard
          label="Notes"
          value={notes.length}
          icon={<MessageSquare size={18} />}
          index={0}
        />
        <StatCard
          label="Times Helped"
          value={totalFollowed}
          subtitle={`${successRate}% success rate`}
          trend={successRate > 60 ? 'up' : successRate > 40 ? 'neutral' : 'down'}
          icon={<TrendingUp size={18} />}
          index={1}
        />
      </div>

      {/* AI Insight banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-4 border border-primary/20"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/20 p-2">
            <Sparkles size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground text-sm">Pattern detected</p>
            <p className="text-xs text-muted-foreground mt-1">
              You usually open social media around 11pm. Past You left a message for this moment.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Notes section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-medium text-foreground">Your Notes</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/10"
          onClick={() => navigate('/create')}
        >
          <Plus size={16} className="mr-1" />
          New
        </Button>
      </div>

      {notes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex rounded-full bg-muted p-4 mb-4">
            <Calendar size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No notes yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Write a message to your future self
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/create')}
          >
            <Plus size={16} className="mr-2" />
            Create First Note
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {notes.map((note, index) => (
            <NoteCard
              key={note.id}
              note={note}
              index={index}
              onClick={() => navigate(`/note/${note.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
