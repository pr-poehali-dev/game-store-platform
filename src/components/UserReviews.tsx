import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Review, ReviewFilter } from '@/types/reviews';
import { useToast } from '@/hooks/use-toast';

interface UserReviewsProps {
  gameId: number;
  gameName: string;
}

export const UserReviews = ({ gameId, gameName }: UserReviewsProps) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [isWritingReview, setIsWritingReview] = useState(false);

  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: '',
    pros: [''],
    cons: [''],
  });

  const filteredReviews = useMemo(() => {
    if (filter === 'all') return reviews;
    if (filter === 'positive')
      return reviews.filter((r) => r.rating >= 7);
    if (filter === 'negative')
      return reviews.filter((r) => r.rating < 7);
    if (filter === 'verified')
      return reviews.filter((r) => r.verified);
    return reviews;
  }, [reviews, filter]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const dist = { 10: 0, 9: 0, 8: 0, 7: 0, 6: 0, 5: 0 };
    reviews.forEach((r) => {
      const rating = Math.floor(r.rating);
      if (rating >= 5 && rating <= 10) {
        dist[rating as keyof typeof dist]++;
      }
    });
    return dist;
  }, [reviews]);

  const handleSubmitReview = () => {
    if (!newReview.title || !newReview.content) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      gameId,
      userId: 'current-user',
      userName: 'Игрок',
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      pros: newReview.pros.filter((p) => p.trim()),
      cons: newReview.cons.filter((c) => c.trim()),
      helpful: 0,
      notHelpful: 0,
      createdAt: new Date(),
      verified: false,
      reactions: { like: 0, funny: 0, love: 0, wow: 0 },
    };

    setReviews([review, ...reviews]);
    setIsWritingReview(false);
    setNewReview({
      rating: 5,
      title: '',
      content: '',
      pros: [''],
      cons: [''],
    });

    toast({
      title: 'Отзыв опубликован!',
      description: 'Спасибо за ваш отзыв',
    });
  };

  const handleReaction = (
    reviewId: string,
    type: 'helpful' | 'notHelpful'
  ) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? { ...r, [type]: r[type] + 1 }
          : r
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Отзывы игроков</h2>
          <p className="text-muted-foreground">
            {reviews.length} отзывов
          </p>
        </div>
        <Dialog open={isWritingReview} onOpenChange={setIsWritingReview}>
          <DialogTrigger asChild>
            <Button>
              <Icon name="PenLine" size={18} className="mr-2" />
              Написать отзыв
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ваш отзыв на {gameName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Оценка (1-10)</Label>
                <div className="flex items-center gap-2 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <Button
                      key={num}
                      variant={
                        newReview.rating === num ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: num })
                      }
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Заголовок отзыва</Label>
                <Input
                  placeholder="Кратко опишите ваше впечатление"
                  value={newReview.title}
                  onChange={(e) =>
                    setNewReview({ ...newReview, title: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Подробный отзыв</Label>
                <Textarea
                  placeholder="Расскажите о своем опыте игры..."
                  value={newReview.content}
                  onChange={(e) =>
                    setNewReview({ ...newReview, content: e.target.value })
                  }
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div>
                <Label>Плюсы</Label>
                <div className="space-y-2 mt-2">
                  {newReview.pros.map((pro, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Что вам понравилось?"
                        value={pro}
                        onChange={(e) => {
                          const newPros = [...newReview.pros];
                          newPros[index] = e.target.value;
                          setNewReview({ ...newReview, pros: newPros });
                        }}
                      />
                      {newReview.pros.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setNewReview({
                              ...newReview,
                              pros: newReview.pros.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setNewReview({
                        ...newReview,
                        pros: [...newReview.pros, ''],
                      })
                    }
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить плюс
                  </Button>
                </div>
              </div>

              <div>
                <Label>Минусы</Label>
                <div className="space-y-2 mt-2">
                  {newReview.cons.map((con, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Что можно улучшить?"
                        value={con}
                        onChange={(e) => {
                          const newCons = [...newReview.cons];
                          newCons[index] = e.target.value;
                          setNewReview({ ...newReview, cons: newCons });
                        }}
                      />
                      {newReview.cons.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setNewReview({
                              ...newReview,
                              cons: newReview.cons.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setNewReview({
                        ...newReview,
                        cons: [...newReview.cons, ''],
                      })
                    }
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить минус
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmitReview} className="flex-1">
                  Опубликовать отзыв
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsWritingReview(false)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {reviews.length > 0 && (
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex items-start gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold">{averageRating}</div>
              <div className="flex items-center gap-1 mt-2">
                <Icon name="Star" size={16} className="text-yellow-500" fill="currentColor" />
                <span className="text-sm text-muted-foreground">
                  из 10
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {Object.entries(ratingDistribution)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm w-12">
                      {rating} <Icon name="Star" size={12} className="inline" />
                    </span>
                    <Progress
                      value={(count / reviews.length) * 100}
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-12">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {(['all', 'positive', 'negative', 'verified'] as ReviewFilter[]).map(
          (f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'all' && 'Все'}
              {f === 'positive' && 'Положительные'}
              {f === 'negative' && 'Отрицательные'}
              {f === 'verified' && 'Проверенные'}
            </Button>
          )
        )}
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет отзывов. Станьте первым!</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card rounded-lg border p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>
                      {review.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Icon name="Check" size={12} className="mr-1" />
                          Проверено
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.createdAt.toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-500" fill="currentColor" />
                  <span className="font-bold">{review.rating}/10</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{review.title}</h3>
                <p className="text-muted-foreground">{review.content}</p>
              </div>

              {review.pros.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="ThumbsUp" size={16} className="text-green-500" />
                    <span className="text-sm font-medium">Плюсы:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {review.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
              )}

              {review.cons.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="ThumbsDown" size={16} className="text-red-500" />
                    <span className="text-sm font-medium">Минусы:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {review.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(review.id, 'helpful')}
                  >
                    <Icon name="ThumbsUp" size={16} className="mr-2" />
                    Полезно ({review.helpful})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReaction(review.id, 'notHelpful')}
                  >
                    <Icon name="ThumbsDown" size={16} className="mr-2" />
                    ({review.notHelpful})
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
