import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

// Types
interface Notification {
  id: number;
  type: "wishlist_discount" | "new_tournament" | "lootbox_ready" | "friend_request";
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  metadata?: Record<string, unknown>;
}

// Notification type configuration
const notificationConfig = {
  wishlist_discount: {
    icon: "Tag",
    gradient: "from-neon-pink to-neon-purple",
    iconBg: "bg-gradient-to-br from-neon-pink/20 to-neon-purple/20",
    iconColor: "text-neon-pink",
  },
  new_tournament: {
    icon: "Trophy",
    gradient: "from-neon-purple to-neon-blue",
    iconBg: "bg-gradient-to-br from-neon-purple/20 to-neon-blue/20",
    iconColor: "text-neon-purple",
  },
  lootbox_ready: {
    icon: "Gift",
    gradient: "from-neon-green to-neon-blue",
    iconBg: "bg-gradient-to-br from-neon-green/20 to-neon-blue/20",
    iconColor: "text-neon-green",
  },
  friend_request: {
    icon: "UserPlus",
    gradient: "from-neon-blue to-neon-purple",
    iconBg: "bg-gradient-to-br from-neon-blue/20 to-neon-purple/20",
    iconColor: "text-neon-blue",
  },
};

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock data - in production, this would come from a database/API
  useEffect(() => {
    // Simulate fetching notifications
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: "wishlist_discount",
        title: "Wishlist Item on Sale!",
        message: "Cyberpunk 2077 is now 50% off",
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
      {
        id: 2,
        type: "lootbox_ready",
        title: "Lootbox Ready!",
        message: "Your Daily Lootbox is ready to open",
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      },
      {
        id: 3,
        type: "new_tournament",
        title: "New Tournament Available",
        message: "CS:GO Championship starting in 2 hours",
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: 4,
        type: "friend_request",
        title: "New Friend Request",
        message: "Player_123 wants to be your friend",
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 5,
        type: "wishlist_discount",
        title: "Wishlist Item on Sale!",
        message: "The Witcher 3 is now 70% off",
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      },
    ];
    
    setNotifications(mockNotifications);
  }, []);
  
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };
  
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="Bell" className="h-5 w-5" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge
                    variant="destructive"
                    className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-neon-pink to-neon-purple animate-pulse"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent
        className="w-96 p-0 border-2 border-neon-purple/30 bg-card/95 backdrop-blur-md"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Icon name="Bell" className="h-5 w-5 text-neon-purple" />
              Notifications
            </h3>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs hover:text-neon-purple"
            >
              <Icon name="CheckCheck" className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <Icon name="BellOff" className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification, index) => {
                const config = notificationConfig[notification.type];
                
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-all group hover:bg-muted/50",
                        !notification.is_read && "bg-muted/30"
                      )}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <div className={cn("p-2 rounded-lg shrink-0 h-fit", config.iconBg)}>
                          <Icon
                            name={config.icon}
                            className={cn("h-5 w-5", config.iconColor)}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={cn(
                              "font-semibold text-sm",
                              !notification.is_read && `bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`
                            )}>
                              {notification.title}
                            </h4>
                            {!notification.is_read && (
                              <div className={cn(
                                "h-2 w-2 rounded-full shrink-0 mt-1.5 bg-gradient-to-r",
                                config.gradient
                              )} />
                            )}
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Icon name="Clock" className="h-3 w-3" />
                            {getTimeAgo(notification.created_at)}
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    {index < notifications.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-3">
              <Button
                variant="ghost"
                className="w-full text-sm hover:text-neon-purple"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="Archive" className="mr-2 h-4 w-4" />
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPanel;
