import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Bell, 
  Shield, 
  Moon, 
  Cloud,
  Trash2,
  ChevronRight,
  Info
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="px-4 pt-12 pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <Settings size={20} className="text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Preferences</p>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Settings
        </h1>
      </motion.header>

      <div className="space-y-4">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive note reminders</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </motion.div>

        {/* Do Not Disturb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-4 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent p-2 text-accent-foreground">
                  <Moon size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Quiet Hours</p>
                  <p className="text-xs text-muted-foreground">11pm - 7am</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </div>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-success/20 p-2 text-success">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Privacy Mode</p>
                  <p className="text-xs text-muted-foreground">All data stays on device</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </motion.div>

        {/* Cloud Sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-4 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary p-2 text-secondary-foreground">
                  <Cloud size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Cloud Backup</p>
                  <p className="text-xs text-muted-foreground">Sync across devices</p>
                </div>
              </div>
              <Switch />
            </div>
          </Card>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="pt-6"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Danger Zone
          </p>
          <Card className="p-4 bg-destructive/5 border-destructive/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
                  <Trash2 size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Delete All Data</p>
                  <p className="text-xs text-muted-foreground">This cannot be undone</p>
                </div>
              </div>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <Card className="p-4 bg-card border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <Info size={18} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">About Future You</p>
                  <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
