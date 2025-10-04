import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Вернуться на главную
        </Button>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <Icon name="Shield" size={32} className="text-neon-purple" />
              Политика конфиденциальности
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Последнее обновление: 04 октября 2025 года
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Общие положения</h2>
              <p>
                GodStoreGame ("мы", "наш") уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. 
                Настоящая политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу информацию.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Собираемая информация</h2>
              <p className="mb-2">Мы собираем следующие типы информации:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email адрес для связи и отправки заказов</li>
                <li>Информация о платежах (через защищенные платежные системы)</li>
                <li>IP-адрес и данные об устройстве для безопасности</li>
                <li>История покупок и предпочтения игр</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Использование информации</h2>
              <p className="mb-2">Мы используем вашу информацию для:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Обработки и доставки ваших заказов</li>
                <li>Связи с вами по вопросам заказов</li>
                <li>Улучшения наших услуг и персонализации предложений</li>
                <li>Обеспечения безопасности и предотвращения мошенничества</li>
                <li>Соблюдения законодательных требований</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Защита данных</h2>
              <p>
                Мы применяем современные технологии шифрования и безопасности для защиты ваших данных. 
                Платежная информация обрабатывается через сертифицированные PCI DSS платежные системы. 
                Доступ к персональным данным имеют только уполномоченные сотрудники.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Передача данных третьим лицам</h2>
              <p className="mb-2">Мы можем передавать ваши данные только:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Платежным системам для обработки платежей</li>
                <li>Платформам PlayStation и Xbox для активации игр</li>
                <li>По требованию законодательства</li>
              </ul>
              <p className="mt-2">Мы не продаем и не передаем ваши данные третьим лицам для маркетинговых целей.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Cookies и аналитика</h2>
              <p>
                Мы используем cookies для улучшения работы сайта и анализа посещаемости. 
                Вы можете отключить cookies в настройках браузера, но это может ограничить функциональность сайта.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Ваши права</h2>
              <p className="mb-2">Вы имеете право:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Запросить доступ к вашим персональным данным</li>
                <li>Исправить неточные данные</li>
                <li>Удалить ваши данные (с соблюдением законодательных требований)</li>
                <li>Отозвать согласие на обработку данных</li>
                <li>Получить копию ваших данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Хранение данных</h2>
              <p>
                Мы храним ваши персональные данные только в течение необходимого периода для выполнения наших обязательств 
                и соблюдения законодательных требований. История покупок хранится в течение 3 лет для целей гарантийного обслуживания.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Безопасность несовершеннолетних</h2>
              <p>
                Наши услуги предназначены для лиц старше 18 лет. Если вы несовершеннолетний, 
                вы можете использовать наш сервис только с разрешения родителей или опекунов.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Изменения в политике</h2>
              <p>
                Мы можем обновлять данную политику конфиденциальности. О существенных изменениях мы уведомим вас 
                по email или через уведомление на сайте. Дата последнего обновления указана в начале документа.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Контакты</h2>
              <p className="mb-2">По вопросам конфиденциальности обращайтесь:</p>
              <div className="space-y-2 ml-4">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email: godstoregame@yandex.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  Telegram: @GodStoreGame
                </p>
              </div>
            </section>

            <div className="pt-6 border-t border-border">
              <p className="text-sm">
                Используя наш сайт, вы соглашаетесь с условиями данной политики конфиденциальности.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
