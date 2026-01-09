import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note, NoteDelivery, Mood } from '@/types';

interface AppState {
  notes: Note[];
  deliveries: NoteDelivery[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'timesTriggered' | 'timesFollowed' | 'timesIgnored'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  recordDelivery: (delivery: Omit<NoteDelivery, 'id'>) => void;
  updateDeliveryAction: (id: string, action: NoteDelivery['action'], feedback?: string) => void;
}

// Sample data for demo
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Remember why you stopped scrolling',
    message: 'Hey, you wrote this because you always feel empty after an hour on social media. Go read that book instead, or call Mom. You\'ll thank yourself.',
    mood: 'anxious',
    reason: 'I wasted 3 hours last night and felt terrible',
    triggers: [
      { id: 't1', type: 'app_usage', label: 'After 30min on social apps', config: { apps: ['instagram', 'twitter'], minutes: 30 }, enabled: true },
      { id: 't2', type: 'time_of_day', label: 'Late night (after 11pm)', config: { after: '23:00' }, enabled: true },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    timesTriggered: 12,
    timesFollowed: 8,
    timesIgnored: 4,
  },
  {
    id: '2',
    title: 'You don\'t need to buy that',
    message: 'Pause. Is this purchase going to matter in a month? You have enough. Sleep on it and decide tomorrow with fresh eyes.',
    mood: 'motivated',
    reason: 'Impulse buying has cost me a lot',
    triggers: [
      { id: 't3', type: 'app_usage', label: 'When opening shopping apps', config: { apps: ['amazon', 'shopping'] }, enabled: true },
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    timesTriggered: 5,
    timesFollowed: 4,
    timesIgnored: 1,
  },
  {
    id: '3',
    title: 'Take a breath before responding',
    message: 'You\'re probably feeling defensive right now. That\'s okay. But you know that angry texts never help. Write it out, then delete it. Respond tomorrow.',
    mood: 'frustrated',
    triggers: [
      { id: 't4', type: 'mood_checkin', label: 'When feeling frustrated', config: { moods: ['frustrated', 'anxious'] }, enabled: true },
    ],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    timesTriggered: 3,
    timesFollowed: 3,
    timesIgnored: 0,
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      notes: sampleNotes,
      deliveries: [],
      
      addNote: (noteData) => {
        const note: Note = {
          ...noteData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          timesTriggered: 0,
          timesFollowed: 0,
          timesIgnored: 0,
        };
        set((state) => ({ notes: [note, ...state.notes] }));
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
      },
      
      recordDelivery: (deliveryData) => {
        const delivery: NoteDelivery = {
          ...deliveryData,
          id: crypto.randomUUID(),
        };
        set((state) => ({ deliveries: [delivery, ...state.deliveries] }));
      },
      
      updateDeliveryAction: (id, action, feedback) => {
        set((state) => ({
          deliveries: state.deliveries.map((d) =>
            d.id === id ? { ...d, action, feedback } : d
          ),
        }));
      },
    }),
    {
      name: 'future-you-storage',
    }
  )
);
