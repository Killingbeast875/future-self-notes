export type Mood = 'calm' | 'anxious' | 'motivated' | 'sad' | 'happy' | 'frustrated';

export type TriggerType = 
  | 'app_usage' 
  | 'time_of_day' 
  | 'location' 
  | 'screen_time' 
  | 'mood_checkin'
  | 'manual';

export interface Trigger {
  id: string;
  type: TriggerType;
  label: string;
  config: Record<string, unknown>;
  enabled: boolean;
}

export interface Note {
  id: string;
  title: string;
  message: string;
  mood?: Mood;
  reason?: string;
  triggers: Trigger[];
  createdAt: Date;
  updatedAt: Date;
  timesTriggered: number;
  timesFollowed: number;
  timesIgnored: number;
}

export interface NoteDelivery {
  id: string;
  noteId: string;
  triggeredAt: Date;
  triggerType: TriggerType;
  action: 'followed' | 'ignored' | 'snoozed' | 'pending';
  feedback?: string;
}

export interface Stats {
  totalNotes: number;
  totalTriggers: number;
  timesHelped: number;
  streakDays: number;
}
