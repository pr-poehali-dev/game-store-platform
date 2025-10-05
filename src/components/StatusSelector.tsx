import { useState } from 'react';
import { CircleDot, Gamepad2, Coffee, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

type UserStatus = 'online' | 'in-game' | 'away' | 'offline';

interface StatusOption {
  value: UserStatus;
  label: string;
  icon: string;
  color: string;
}

const statusOptions: StatusOption[] = [
  { value: 'online', label: 'Онлайн', icon: 'CircleDot', color: 'text-green-500' },
  { value: 'in-game', label: 'В игре', icon: 'Gamepad2', color: 'text-blue-500' },
  { value: 'away', label: 'Не беспокоить', icon: 'Coffee', color: 'text-yellow-500' },
  { value: 'offline', label: 'Не в сети', icon: 'Moon', color: 'text-gray-500' },
];

interface StatusSelectorProps {
  currentStatus: UserStatus;
  currentGame?: string;
  onStatusChange: (status: UserStatus) => void;
  onCustomStatusChange?: (message: string) => void;
}

export default function StatusSelector({
  currentStatus,
  currentGame,
  onStatusChange,
  onCustomStatusChange,
}: StatusSelectorProps) {
  const [customStatus, setCustomStatus] = useState('');
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  const currentStatusOption = statusOptions.find((s) => s.value === currentStatus);

  const handleSaveCustomStatus = () => {
    onCustomStatusChange?.(customStatus);
    setIsEditingCustom(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Icon
            name={currentStatusOption?.icon || 'CircleDot'}
            size={16}
            className={currentStatusOption?.color}
          />
          <span className="text-sm">
            {currentStatusOption?.label}
            {currentStatus === 'in-game' && currentGame && (
              <span className="text-muted-foreground ml-1">• {currentGame}</span>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            УСТАНОВИТЬ СТАТУС
          </p>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="cursor-pointer"
              onClick={() => onStatusChange(option.value)}
            >
              <Icon name={option.icon} size={16} className={`mr-3 ${option.color}`} />
              <span>{option.label}</span>
              {currentStatus === option.value && (
                <Icon name="Check" size={14} className="ml-auto" />
              )}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            ПОЛЬЗОВАТЕЛЬСКИЙ СТАТУС
          </p>
          {isEditingCustom ? (
            <div className="space-y-2">
              <Input
                placeholder="Чем вы сейчас заняты?"
                value={customStatus}
                onChange={(e) => setCustomStatus(e.target.value)}
                maxLength={128}
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={handleSaveCustomStatus}>
                  Сохранить
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsEditingCustom(false);
                    setCustomStatus('');
                  }}
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsEditingCustom(true)}
            >
              <Icon name="MessageSquare" size={16} className="mr-3" />
              <span>Добавить статус</span>
            </DropdownMenuItem>
          )}
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>💡 <strong>Онлайн</strong> - доступен для игр</p>
            <p>🎮 <strong>В игре</strong> - автоматически</p>
            <p>☕ <strong>Не беспокоить</strong> - без уведомлений</p>
            <p>🌙 <strong>Не в сети</strong> - невидимый режим</p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
