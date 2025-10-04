import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  helpful_count: number;
  verified_purchase: boolean;
}

interface ReviewsSectionProps {
  gameId: number;
  currentUserName?: string;
}

export default function ReviewsSection({ gameId, currentUserName }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`https://functions.poehali.dev/4e2d5b0a-a3f1-4c8a-8b9e-1d2c3e4f5a6b?game_id=${gameId}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      toast.error('Напишите отзыв');
      return;
    }

    setSubmitting(true);
    try {
      await fetch('https://functions.poehali.dev/4e2d5b0a-a3f1-4c8a-8b9e-1d2c3e4f5a6b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          user_name: currentUserName || 'Аноним',
          rating: rating,
          comment: comment,
          verified_purchase: false
        })
      });

      toast.success('Отзыв добавлен!');
      setComment('');
      setRating(5);
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      toast.error('Ошибка при добавлении отзыва');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHelpful = async (reviewId: number) => {
    try {
      await fetch('https://functions.poehali.dev/3f4e5d6c-7b8a-9c0d-1e2f-3a4b5c6d7e8f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review_id: reviewId })
      });

      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, helpful_count: r.helpful_count + 1 } : r
      ));
      toast.success('Спасибо за оценку!');
    } catch (error) {
      toast.error('Ошибка');
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <Card className="bg-card/80 border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageSquare" className="text-neon-purple" />
            Отзывы ({reviews.length})
          </CardTitle>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} variant="outline" size="sm">
              <Icon name="Plus" size={16} />
              Написать отзыв
            </Button>
          )}
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold">{avgRating}</span>
            </div>
            <span className="text-muted-foreground text-sm">средний рейтинг</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="bg-background/50 p-4 rounded-lg space-y-3 border border-border">
            <div>
              <div className="text-sm font-medium mb-2">Ваша оценка:</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Icon
                      name="Star"
                      size={24}
                      className={star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Textarea
                placeholder="Поделитесь своими впечатлениями об игре..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReview} disabled={submitting}>
                {submitting ? 'Отправка...' : 'Отправить отзыв'}
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Отмена
              </Button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground py-8">Загрузка отзывов...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Отзывов пока нет. Будьте первым!
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background/50 p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user_name}</span>
                    {review.verified_purchase && (
                      <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                        <Icon name="CheckCircle" size={12} />
                        Покупка подтверждена
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>

                <p className="text-sm mb-3">{review.comment}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(review.created_at).toLocaleDateString('ru-RU')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkHelpful(review.id)}
                    className="h-auto py-1 px-2"
                  >
                    <Icon name="ThumbsUp" size={14} />
                    Полезно ({review.helpful_count || 0})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
