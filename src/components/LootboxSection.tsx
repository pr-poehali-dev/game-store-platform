import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Types
interface Lootbox {
  id: number;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: string;
  is_available: boolean;
  cooldown_seconds?: number;
}

interface LootboxReward {
  type: string;
  name: string;
  value: number;
  rarity?: string;
}

interface LootboxHistory {
  id: number;
  lootbox_name: string;
  reward_type: string;
  reward_name: string;
  reward_value: number;
  opened_at: string;
}

const API_URL = "https://functions.poehali.dev/a3bb1dad-0650-4df9-a95d-5104678c176e";

// Fetch lootboxes
const fetchLootboxes = async (): Promise<Lootbox[]> => {
  const response = await fetch(API_URL, {
    headers: {
      "X-User-Id": "1",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch lootboxes");
  }
  
  return response.json();
};

// Open lootbox
const openLootbox = async (lootboxId: number): Promise<LootboxReward> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": "1",
    },
    body: JSON.stringify({ lootbox_id: lootboxId }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to open lootbox");
  }
  
  return response.json();
};

// Rarity colors
const rarityConfig = {
  common: {
    color: "text-gray-400",
    bg: "bg-gray-500/20",
    border: "border-gray-500",
    glow: "shadow-[0_0_20px_rgba(156,163,175,0.3)]",
  },
  rare: {
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  },
  epic: {
    color: "text-neon-purple",
    bg: "bg-neon-purple/20",
    border: "border-neon-purple",
    glow: "glow-purple",
  },
  legendary: {
    color: "text-neon-pink",
    bg: "bg-neon-pink/20",
    border: "border-neon-pink",
    glow: "glow-pink",
  },
};

const LootboxSection = () => {
  const [selectedLootbox, setSelectedLootbox] = useState<Lootbox | null>(null);
  const [openingAnimation, setOpeningAnimation] = useState(false);
  const [reward, setReward] = useState<LootboxReward | null>(null);
  const [history, setHistory] = useState<LootboxHistory[]>([]);
  
  const queryClient = useQueryClient();
  
  // Fetch lootboxes query
  const { data: lootboxes, isLoading } = useQuery({
    queryKey: ["lootboxes"],
    queryFn: fetchLootboxes,
    refetchInterval: 30000, // Refetch every 30 seconds to update cooldowns
  });
  
  // Open lootbox mutation
  const openMutation = useMutation({
    mutationFn: openLootbox,
    onSuccess: (data, lootboxId) => {
      const lootbox = lootboxes?.find(lb => lb.id === lootboxId);
      
      // Add to history
      const newHistoryItem: LootboxHistory = {
        id: Date.now(),
        lootbox_name: lootbox?.name || "Unknown",
        reward_type: data.type,
        reward_name: data.name,
        reward_value: data.value,
        opened_at: new Date().toISOString(),
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
      setReward(data);
      
      // Invalidate lootboxes to refresh cooldowns
      queryClient.invalidateQueries({ queryKey: ["lootboxes"] });
      
      toast.success("Lootbox opened!", {
        description: `You received: ${data.name}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to open lootbox", {
        description: error.message,
      });
      setOpeningAnimation(false);
      setSelectedLootbox(null);
    },
  });
  
  const handleOpenLootbox = async (lootbox: Lootbox) => {
    if (!lootbox.is_available) {
      toast.error("Lootbox on cooldown", {
        description: `Please wait ${lootbox.cooldown_seconds} seconds`,
      });
      return;
    }
    
    setSelectedLootbox(lootbox);
    setOpeningAnimation(true);
    setReward(null);
    
    // Simulate opening animation delay
    setTimeout(() => {
      openMutation.mutate(lootbox.id);
      setTimeout(() => {
        setOpeningAnimation(false);
      }, 1000);
    }, 2000);
  };
  
  const handleCloseReward = () => {
    setSelectedLootbox(null);
    setReward(null);
  };
  
  if (isLoading) {
    return (
      <Card className="border-neon-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Package" className="h-6 w-6 text-neon-purple" />
            Lootboxes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Icon name="Loader2" className="h-8 w-8 animate-spin text-neon-purple" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Lootboxes Grid */}
      <Card className="border-neon-purple/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Package" className="h-6 w-6 text-neon-purple" />
            Lootboxes
          </CardTitle>
          <CardDescription>Open lootboxes to get rewards and bonuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lootboxes?.map((lootbox) => {
              const config = rarityConfig[lootbox.rarity];
              
              return (
                <motion.div
                  key={lootbox.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={cn(
                      "relative overflow-hidden border-2 transition-all cursor-pointer",
                      config.border,
                      lootbox.is_available ? config.glow : "opacity-60"
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-3 rounded-lg", config.bg)}>
                            <Icon
                              name={lootbox.icon}
                              className={cn("h-8 w-8", config.color)}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{lootbox.name}</CardTitle>
                            <Badge variant="outline" className={cn("mt-1", config.color, config.border)}>
                              {lootbox.rarity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{lootbox.description}</p>
                      
                      <Button
                        className={cn(
                          "w-full",
                          lootbox.is_available
                            ? "bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90"
                            : ""
                        )}
                        disabled={!lootbox.is_available || openingAnimation}
                        onClick={() => handleOpenLootbox(lootbox)}
                      >
                        {lootbox.is_available ? (
                          <>
                            <Icon name="Gift" className="mr-2 h-4 w-4" />
                            Open
                          </>
                        ) : (
                          <>
                            <Icon name="Timer" className="mr-2 h-4 w-4" />
                            Cooldown: {lootbox.cooldown_seconds}s
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Opening Animation & Reward Modal */}
      <AnimatePresence>
        {(openingAnimation || reward) && selectedLootbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={reward ? handleCloseReward : undefined}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 0 }}
              animate={{
                scale: openingAnimation ? [1, 1.2, 1] : 1,
                rotateY: openingAnimation ? [0, 180, 360] : 0,
              }}
              transition={{ duration: 2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              {openingAnimation ? (
                <Card className={cn("w-80 border-4", rarityConfig[selectedLootbox.rarity].border, rarityConfig[selectedLootbox.rarity].glow)}>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Icon
                      name={selectedLootbox.icon}
                      className={cn("h-24 w-24 animate-pulse", rarityConfig[selectedLootbox.rarity].color)}
                    />
                    <h3 className="mt-4 text-2xl font-bold">Opening...</h3>
                  </CardContent>
                </Card>
              ) : reward ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <Card className="w-96 border-4 border-neon-green glow-green">
                    <CardHeader className="text-center">
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CardTitle className="text-3xl text-neon-green">
                          <Icon name="Sparkles" className="inline-block mr-2 h-8 w-8" />
                          Reward!
                        </CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="flex flex-col items-center"
                      >
                        <div className="p-6 rounded-full bg-neon-green/20 mb-4">
                          <Icon name="Trophy" className="h-16 w-16 text-neon-green" />
                        </div>
                        <h3 className="text-2xl font-bold">{reward.name}</h3>
                        <Badge variant="secondary" className="mt-2">
                          {reward.type}
                        </Badge>
                        <p className="text-3xl font-bold text-neon-green mt-4">
                          {reward.value.toLocaleString()}
                        </p>
                      </motion.div>
                      
                      <Button
                        className="w-full bg-neon-green text-black hover:bg-neon-green/90"
                        onClick={handleCloseReward}
                      >
                        <Icon name="Check" className="mr-2 h-4 w-4" />
                        Claim Reward
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* History */}
      {history.length > 0 && (
        <Card className="border-neon-green/30 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" className="h-5 w-5 text-neon-green" />
              Recent Openings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neon-green/20">
                          <Icon name="Package" className="h-4 w-4 text-neon-green" />
                        </div>
                        <div>
                          <p className="font-medium">{item.reward_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.lootbox_name} • {item.reward_type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-neon-green">
                          +{item.reward_value.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.opened_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    {index < history.length - 1 && <Separator className="my-2" />}
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LootboxSection;
