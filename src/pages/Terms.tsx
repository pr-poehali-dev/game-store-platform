import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
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
              <Icon name="FileText" size={32} className="text-neon-green" />
              Условия использования
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Последнее обновление: 04 октября 2025 года
            </p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Принятие условий</h2>
              <p>
                Используя сайт GodStoreGame, вы соглашаетесь с настоящими условиями использования. 
                Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Описание услуг</h2>
              <p className="mb-2">GodStoreGame предоставляет следующие услуги:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Продажа цифровых игр для PlayStation и Xbox</li>
                <li>Продажа подписок PlayStation Plus и Xbox Game Pass</li>
                <li>Продажа готовых аккаунтов для игровых платформ</li>
                <li>Продажа карт пополнения PSN кошелька</li>
                <li>Пополнение баланса Steam</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Регистрация и аккаунт</h2>
              <p className="mb-2">
                Для совершения покупок необходимо предоставить корректные контактные данные (email, Telegram). 
                Вы несете ответственность за:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Достоверность предоставленной информации</li>
                <li>Конфиденциальность данных вашего аккаунта</li>
                <li>Все действия, совершенные с вашего аккаунта</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Покупки и оплата</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.1. Способы оплаты</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Банковские карты РФ (Visa, Mastercard, МИР)</li>
                    <li>Система быстрых платежей (СБП)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.2. Цены</h3>
                  <p>
                    Все цены указаны в российских рублях и включают все применимые налоги. 
                    Мы оставляем за собой право изменять цены без предварительного уведомления.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">4.3. Доставка</h3>
                  <p>
                    Цифровые товары доставляются моментально на указанный email или в Telegram 
                    после подтверждения оплаты (обычно в течение 5-15 минут).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Возврат и обмен</h2>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Возврат возможен в следующих случаях:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Предоставлен неработающий код активации</li>
                  <li>Товар не соответствует описанию</li>
                  <li>Технические проблемы с активацией по нашей вине</li>
                </ul>
                <p className="mt-3">
                  Возврат НЕ осуществляется, если код был успешно активирован на вашем аккаунте. 
                  Для возврата средств свяжитесь с нами в течение 24 часов с момента покупки.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Гарантии</h2>
              <p className="mb-2">Мы гарантируем:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Все игры и подписки являются лицензионными</li>
                <li>Коды активации работоспособны на момент продажи</li>
                <li>Техническую поддержку при проблемах с активацией</li>
                <li>Конфиденциальность ваших данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Ограничения использования</h2>
              <p className="mb-2">Запрещается:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Использовать сервис для незаконной деятельности</li>
                <li>Передавать полученные коды третьим лицам для перепродажи</li>
                <li>Совершать действия, направленные на обход защиты или взлом</li>
                <li>Использовать автоматизированные средства для массовых покупок</li>
                <li>Предоставлять ложную информацию при оформлении заказа</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Региональные ограничения</h2>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Важно для покупателей:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>PlayStation:</strong> Игры доступны для аккаунтов регионов Турция, Индия, Украина. 
                    Убедитесь, что ваш аккаунт соответствует региону покупаемой игры.
                  </li>
                  <li>
                    <strong>Xbox:</strong> Покупка игр на аккаунт Xbox доступна только через наш сервис 
                    из-за региональных ограничений. Мы обеспечиваем правильную настройку и активацию.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Интеллектуальная собственность</h2>
              <p>
                Все права на товарные знаки, логотипы и названия игр принадлежат их владельцам 
                (Sony, Microsoft, разработчикам игр). Мы являемся официальным продавцом лицензионных продуктов.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Ответственность</h2>
              <p className="mb-2">GodStoreGame не несет ответственности за:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Действия Sony, Microsoft и других правообладателей</li>
                <li>Изменения в работе игровых платформ</li>
                <li>Блокировку аккаунтов за нарушение правил платформ</li>
                <li>Технические проблемы на стороне игровых сервисов</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Изменение условий</h2>
              <p>
                Мы оставляем за собой право изменять настоящие условия использования. 
                Существенные изменения будут опубликованы на сайте за 7 дней до вступления в силу.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Контакты и поддержка</h2>
              <div className="space-y-2 ml-4">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  Email: godstoregame@yandex.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  Telegram: @GodStoreGame
                </p>
                <p className="mt-3">
                  Служба поддержки работает 24/7 и отвечает в течение 30 минут.
                </p>
              </div>
            </section>

            <div className="pt-6 border-t border-border">
              <p className="text-sm">
                Совершая покупку на нашем сайте, вы подтверждаете, что прочитали и согласны с настоящими условиями использования.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
