import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: number;
  game_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_verified: boolean;
  likes: number;
  platform: string;
}

interface GameReviewsProps {
  gameId: number;
  gameTitle: string;
}

const REVIEWS_API_URL = 'https://functions.poehali.dev/d19a60a3-de94-4cfb-93ba-a467d4fc5a21';

export default function GameReviews({ gameId, gameTitle }: GameReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [gameId]);

  const loadReviews = async () => {
    try {
      const response = await fetch(`${REVIEWS_API_URL}?game_id=${gameId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!userName.trim() || !comment.trim()) {
      alert('Заполните все поля');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(REVIEWS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game_id: gameId,
          user_name: userName,
          rating,
          comment,
        }),
      });

      if (response.ok) {
        setUserName('');
        setRating(5);
        setComment('');
        setShowForm(false);
        loadReviews();
        alert('Спасибо за отзыв! ⭐');
      }
    } catch (error) {
      alert('Ошибка при отправке отзыва');
    } finally {
      setIsLoading(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icon name="MessageSquare" size={24} className="text-primary" />
            Отзывы о {gameTitle}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={18}
                  className={i < Math.round(parseFloat(averageRating)) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-sm text-muted-foreground">({reviews.length} отзывов)</span>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Написать отзыв
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-lg">Ваш отзыв</CardTitle>
                <CardDescription>Поделитесь впечатлениями об игре</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Как вас зовут?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Расскажите о своих впечатлениях..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitReview}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {isLoading ? 'Отправка...' : 'Опубликовать'}
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline">
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="h-[500px]">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Отзывов пока нет. Станьте первым!
                </p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border hover:border-primary/30 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {review.user_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{review.user_name}</p>
                            {review.is_verified && (
                              <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                                <Icon name="BadgeCheck" size={12} className="mr-1" />
                                Проверено
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed mb-3">{review.comment}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <Icon name="ThumbsUp" size={14} />
                          <span>{review.likes || 0}</span>
                        </button>
                        {review.platform && (
                          <Badge variant="outline" className="text-xs">
                            <Icon name="Gamepad2" size={12} className="mr-1" />
                            {review.platform}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}