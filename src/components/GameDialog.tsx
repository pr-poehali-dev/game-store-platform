import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PriceComparison from '@/components/PriceComparison';
import GameVersionSelector from '@/components/GameVersionSelector';
import GameReviews from '@/components/GameReviews';
import type { Game, GameVersion } from '@/types';

interface GameDialogProps {
  selectedGame: Game | null;
  selectedVersion: GameVersion | null;
  favorites: number[];
  onClose: () => void;
  onToggleFavorite: (gameId: number) => void;
  onVersionChange: (version: GameVersion) => void;
  onBuy: (game: Game) => void;
}

export default function GameDialog({
  selectedGame,
  selectedVersion,
  favorites,
  onClose,
  onToggleFavorite,
  onVersionChange,
  onBuy
}: GameDialogProps) {
  return (
    <Dialog open={!!selectedGame} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-card border-border">
        {selectedGame && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-2">{selectedGame.title}</DialogTitle>
                  <DialogDescription className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{selectedGame.platform}</Badge>
                    <Badge variant="outline">{selectedGame.category}</Badge>
                    <Badge variant="outline">
                      <Icon name="Star" size={12} className="mr-1 text-yellow-500" />
                      {selectedGame.rating}/10
                    </Badge>
                    <Badge variant="outline">{selectedGame.release_year}</Badge>
                  </DialogDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite(selectedGame.id)}
                >
                  <Icon 
                    name="Heart" 
                    size={24} 
                    className={favorites.includes(selectedGame.id) ? 'fill-red-500 text-red-500' : ''} 
                  />
                </Button>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <img 
                src={selectedGame.image_url} 
                alt={selectedGame.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Описание</TabsTrigger>
                  <TabsTrigger value="reviews">Отзывы</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <p className="text-muted-foreground">{selectedGame.description}</p>
                  {selectedGame.fullDescription && (
                    <p className="text-sm text-foreground/80 leading-relaxed">{selectedGame.fullDescription}</p>
                  )}
                  {selectedGame.consoleModels && (
                    <div className="flex items-center gap-2">
                      <Icon name="Gamepad2" size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Платформы: {selectedGame.consoleModels}</span>
                    </div>
                  )}
                  
                  <PriceComparison 
                    ourPrice={selectedGame.price}
                    competitorPrices={selectedGame.competitorPrices}
                    discount={selectedGame.discount}
                  />
                  
                  {selectedGame.versions && selectedGame.versions.length > 0 && selectedVersion && (
                    <GameVersionSelector
                      versions={selectedGame.versions}
                      selectedVersion={selectedVersion}
                      onVersionChange={onVersionChange}
                      baseDiscount={selectedGame.discount}
                    />
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      {selectedGame.discount && selectedGame.discount > 0 ? (
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold text-neon-green">
                            {Math.round(selectedGame.price * (1 - selectedGame.discount / 100))}₽
                          </span>
                          <span className="text-xl text-muted-foreground line-through">
                            {selectedGame.price}₽
                          </span>
                          <Badge className="bg-red-600 text-white">-{selectedGame.discount}%</Badge>
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-neon-green">{selectedGame.price}₽</span>
                      )}
                    </div>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-neon-purple to-neon-pink"
                      onClick={() => {
                        onBuy(selectedGame);
                        onClose();
                      }}
                    >
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Купить сейчас
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <GameReviews gameId={selectedGame.id} gameTitle={selectedGame.title} />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
