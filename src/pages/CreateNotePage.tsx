import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Mood, Trigger, TriggerType } from '@/types';
import { 
  ArrowLeft, 
  Sun, 
  Cloud, 
  Zap, 
  CloudRain, 
  Smile, 
  Flame,
  Plus,
  X,
  Smartphone,
  Clock,
  MapPin,
  Monitor,
  Heart
} from 'lucide-react';

const moods: { value: Mood; label: string; icon: typeof Sun }[] = [
  { value: 'calm', label: 'Calm', icon: Sun },
  { value: 'anxious', label: 'Anxious', icon: Cloud },
  { value: 'motivated', label: 'Motivated', icon: Zap },
  { value: 'sad', label: 'Sad', icon: CloudRain },
  { value: 'happy', label: 'Happy', icon: Smile },
  { value: 'frustrated', label: 'Frustrated', icon: Flame },
];

const triggerOptions: { type: TriggerType; label: string; icon: typeof Smartphone; description: string }[] = [
  { type: 'app_usage', label: 'App Usage', icon: Smartphone, description: 'When using specific apps' },
  { type: 'time_of_day', label: 'Time of Day', icon: Clock, description: 'At specific times' },
  { type: 'screen_time', label: 'Screen Time', icon: Monitor, description: 'After extended use' },
  { type: 'mood_checkin', label: 'Mood Check-in', icon: Heart, description: 'Based on how you feel' },
  { type: 'location', label: 'Location', icon: MapPin, description: 'At specific places' },
];

const moodColors: Record<Mood, string> = {
  calm: 'bg-mood-calm/20 border-mood-calm/40 text-mood-calm',
  anxious: 'bg-mood-anxious/20 border-mood-anxious/40 text-mood-anxious',
  motivated: 'bg-mood-motivated/20 border-mood-motivated/40 text-mood-motivated',
  sad: 'bg-mood-sad/20 border-mood-sad/40 text-mood-sad',
  happy: 'bg-mood-happy/20 border-mood-happy/40 text-mood-happy',
  frustrated: 'bg-mood-frustrated/20 border-mood-frustrated/40 text-mood-frustrated',
};

export default function CreateNotePage() {
  const navigate = useNavigate();
  const { addNote } = useAppStore();
  
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState<Mood | undefined>();
  const [reason, setReason] = useState('');
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [showTriggerPicker, setShowTriggerPicker] = useState(false);

  const addTrigger = (type: TriggerType) => {
    const option = triggerOptions.find(t => t.type === type);
    if (!option) return;
    
    const newTrigger: Trigger = {
      id: crypto.randomUUID(),
      type,
      label: option.label,
      config: {},
      enabled: true,
    };
    setTriggers([...triggers, newTrigger]);
    setShowTriggerPicker(false);
  };

  const removeTrigger = (id: string) => {
    setTriggers(triggers.filter(t => t.id !== id));
  };

  const handleSave = () => {
    if (!title.trim() || !message.trim()) return;
    
    addNote({
      title: title.trim(),
      message: message.trim(),
      mood,
      reason: reason.trim() || undefined,
      triggers,
    });
    
    navigate('/');
  };

  const canSave = title.trim() && message.trim();

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
        <div className="flex-1">
          <h1 className="font-serif text-2xl font-semibold text-foreground">
            Write to Future You
          </h1>
        </div>
      </motion.header>

      <div className="space-y-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Title
          </label>
          <Input
            placeholder="A short reminder title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-card border-border"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Message
          </label>
          <Textarea
            placeholder="What do you want to tell yourself? Be kind, be honest..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[150px] bg-card border-border resize-none"
          />
        </motion.div>

        {/* Mood */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-foreground mb-3">
            How are you feeling? <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = mood === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setMood(isSelected ? undefined : m.value)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
                    isSelected
                      ? moodColors[m.value]
                      : 'bg-muted/50 border-border text-muted-foreground hover:bg-muted'
                  )}
                >
                  <Icon size={14} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Reason */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-medium text-foreground mb-2">
            Why are you writing this? <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            placeholder="I'm writing this because..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="bg-card border-border"
          />
        </motion.div>

        {/* Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-foreground mb-3">
            When should this appear?
          </label>
          
          {/* Added triggers */}
          {triggers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {triggers.map((trigger) => {
                const option = triggerOptions.find(t => t.type === trigger.type);
                const Icon = option?.icon || Smartphone;
                return (
                  <div
                    key={trigger.id}
                    className="flex items-center gap-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 text-sm"
                  >
                    <Icon size={14} />
                    <span>{trigger.label}</span>
                    <button
                      onClick={() => removeTrigger(trigger.id)}
                      className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Trigger picker */}
          {showTriggerPicker ? (
            <Card className="p-3 space-y-2 bg-card border-border">
              {triggerOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.type}
                    onClick={() => addTrigger(option.type)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </button>
                );
              })}
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => setShowTriggerPicker(false)}
              >
                Cancel
              </Button>
            </Card>
          ) : (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={() => setShowTriggerPicker(true)}
            >
              <Plus size={16} className="mr-2" />
              Add Trigger
            </Button>
          )}
        </motion.div>

        {/* Save button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="pt-4"
        >
          <Button
            className="w-full"
            size="lg"
            disabled={!canSave}
            onClick={handleSave}
          >
            Save Note
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
