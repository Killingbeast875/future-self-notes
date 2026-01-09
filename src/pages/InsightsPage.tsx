import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function InsightsPage() {
  const { notes } = useAppStore();

  const totalTriggered = notes.reduce((acc, n) => acc + n.timesTriggered, 0);
  const totalFollowed = notes.reduce((acc, n) => acc + n.timesFollowed, 0);
  const totalIgnored = notes.reduce((acc, n) => acc + n.timesIgnored, 0);
  const successRate = totalTriggered > 0 ? Math.round((totalFollowed / totalTriggered) * 100) : 0;

  // Top performing notes
  const topNotes = [...notes]
    .filter(n => n.timesTriggered > 0)
    .sort((a, b) => (b.timesFollowed / b.timesTriggered) - (a.timesFollowed / a.timesTriggered))
    .slice(0, 3);

  return (
    <div className="px-4 pt-12 pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={20} className="text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Reflection</p>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Your Insights
        </h1>
      </motion.header>

      {/* Overview stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <StatCard
          label="Total Notes"
          value={notes.length}
          icon={<MessageSquare size={18} />}
          index={0}
        />
        <StatCard
          label="Times Triggered"
          value={totalTriggered}
          icon={<Clock size={18} />}
          index={1}
        />
        <StatCard
          label="Advice Followed"
          value={totalFollowed}
          subtitle={`${successRate}% of triggers`}
          trend={successRate > 60 ? 'up' : 'neutral'}
          icon={<CheckCircle2 size={18} />}
          index={2}
        />
        <StatCard
          label="Times Ignored"
          value={totalIgnored}
          icon={<XCircle size={18} />}
          index={3}
        />
      </div>

      {/* Success rate visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-5 bg-card border-border/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-medium">Overall Success Rate</h3>
            <span className="text-2xl font-serif font-semibold text-primary">{successRate}%</span>
          </div>
          <Progress value={successRate} className="h-3" />
          <p className="text-xs text-muted-foreground mt-3">
            {successRate >= 70 
              ? "Amazing! Past You is really helping. Keep it up!" 
              : successRate >= 50 
              ? "Good progress! You're listening to yourself more often."
              : "It's okay. Building better habits takes time."}
          </p>
        </Card>
      </motion.div>

      {/* Top performing notes */}
      {topNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <h2 className="font-serif text-lg font-medium">Most Helpful Notes</h2>
          </div>
          
          <div className="space-y-3">
            {topNotes.map((note, index) => {
              const rate = Math.round((note.timesFollowed / note.timesTriggered) * 100);
              return (
                <Card 
                  key={note.id} 
                  className="p-4 bg-card border-border/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm line-clamp-1">
                        {note.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Triggered {note.timesTriggered} times
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp size={14} />
                      <span className="text-sm font-medium">{rate}%</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* AI insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="p-5 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/20 p-2">
              <Sparkles size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">AI Insight</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Your notes about late-night screen time have been the most effective. 
                Past You helped you avoid regretful scrolling 8 times this month.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
