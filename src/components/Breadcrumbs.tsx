import { useLocation, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const pathToLabel: Record<string, string> = {
  '': 'Главная',
  'dashboard': 'Личный кабинет',
  'console-catalog': 'PS/Xbox каталог',
  'profile': 'Профиль',
  'manager': 'Менеджер',
  'tournaments': 'Турниры',
  'wishlist': 'Список желаний',
  'social': 'Соцсеть',
  'marketplace': 'Маркетплейс',
  'casino': 'Казино',
  'crafting': 'Крафт',
  'rooms': 'Игровые комнаты',
  'admin': 'Админка',
  'predictions': 'Прогнозы',
  'streams': 'Стримы',
  'clans': 'Кланы',
  'game': 'Игра',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' },
  ];

  let currentPath = '';
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;
    const label = pathToLabel[pathname] || pathname;
    breadcrumbs.push({ label, path: currentPath });
  });

  return (
    <nav className="flex items-center gap-2 text-sm mb-4 px-4 py-2 bg-card/50 rounded-lg">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
