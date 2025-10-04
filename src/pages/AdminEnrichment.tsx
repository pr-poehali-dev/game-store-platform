import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function AdminEnrichment() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const enrichAllGames = async () => {
    setLoading(true);
    setProgress(0);
    
    try {
      const response = await fetch('https://functions.poehali.dev/a1284e02-5be4-41c1-b779-41a8d0479adc?action=enrich_all');
      const data = await response.json();
      
      setResults(data);
      setProgress(100);
      toast.success(`Обогащено ${data.enriched_count} игр из ${data.total_games}`);
    } catch (error) {
      toast.error('Ошибка при обогащении данных');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => window.location.href = '/'}
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          На главную
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-neon-green via-neon-pink to-neon-purple bg-clip-text text-transparent">
              🎮 Обогащение данных игр
            </CardTitle>
            <CardDescription>
              Автоматическое обновление обложек, разработчиков и издателей из RAWG API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="Info" size={18} className="text-neon-purple" />
                Что будет обновлено:
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✅ Обложки игр высокого качества</li>
                <li>✅ Реальные названия разработчиков</li>
                <li>✅ Реальные названия издателей</li>
                <li>✅ Актуальные рейтинги RAWG</li>
              </ul>
            </div>

            {loading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Обработка...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            {results && (
              <div className="bg-neon-green/10 border border-neon-green/30 p-4 rounded-lg">
                <h4 className="font-semibold text-neon-green mb-2">Результат:</h4>
                <div className="space-y-1 text-sm">
                  <p>Обогащено игр: <span className="font-bold">{results.enriched_count}</span></p>
                  <p>Всего игр: <span className="font-bold">{results.total_games}</span></p>
                  <p>Успешность: <span className="font-bold">
                    {Math.round((results.enriched_count / results.total_games) * 100)}%
                  </span></p>
                </div>
              </div>
            )}

            <Button
              onClick={enrichAllGames}
              disabled={loading}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90"
              size="lg"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Обновление данных...
                </>
              ) : (
                <>
                  <Icon name="RefreshCw" size={20} className="mr-2" />
                  Обновить данные игр
                </>
              )}
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              <Icon name="Shield" size={12} className="inline mr-1" />
              Обновление займёт около 1-2 минут для 50 игр
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
