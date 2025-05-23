import { Badge } from '@/components/ui/badge';
import { IStatusObj } from '@/contants/object';
import { getCurrentLocale } from '@/lib/utils';
/**
 * Generates a consistent color code from a string
 * @param str The input string
 * @returns Object with background and text color values
 */
const stringToColor = (status: IStatusObj) => {
  let hash = 0;
  for (let i = 0; i < status.value.length; i++) {
    hash = status.value.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Return object with tailwind color classes
  const colorMap: Record<string, { bg: string; bgHover: string; text: string; dot: string }> = {
    pending: {
      bg: 'bg-amber-600/10 dark:bg-amber-600/20',
      bgHover: 'hover:bg-amber-600/10',
      text: 'text-amber-500',
      dot: 'bg-amber-500',
    },
    approved: {
      bg: 'bg-green-600/10 dark:bg-green-600/20',
      bgHover: 'hover:bg-green-600/10',
      text: 'text-green-500',
      dot: 'bg-green-500',
    },
    rejected: {
      bg: 'bg-red-600/10 dark:bg-red-600/20',
      bgHover: 'hover:bg-red-600/10',
      text: 'text-red-500',
      dot: 'bg-red-500',
    },
    'in progress': {
      bg: 'bg-blue-600/10 dark:bg-blue-600/20',
      bgHover: 'hover:bg-blue-600/10',
      text: 'text-blue-500',
      dot: 'bg-blue-500',
    },
    custom: {
      bg: 'bg-purple-600/10 dark:bg-purple-600/20',
      bgHover: 'hover:bg-purple-600/10',
      text: 'text-purple-500',
      dot: 'bg-purple-500',
    },
    suggest: {
      bg: 'bg-orange-600/10 dark:bg-orange-600/20',
      bgHover: 'hover:bg-orange-600/10',
      text: 'text-orange-500',
      dot: 'bg-orange-500',
    },
    hidden: {
      bg: 'bg-red-600/10 dark:bg-red-600/20',
      bgHover: 'hover:bg-red-600/10',
      text: 'text-red-500',
      dot: 'bg-red-500',
    },
    visible: {
      bg: 'bg-green-600/10 dark:bg-green-600/20',
      bgHover: 'hover:bg-green-600/10',
      text: 'text-green-500',
      dot: 'bg-green-500',
    },
    not_started: {
      bg: 'bg-yellow-600/10 dark:bg-yellow-600/20',
      bgHover: 'hover:bg-yellow-600/10',
      text: 'text-yellow-500',
      dot: 'bg-yellow-500',
    },
    started: {
      bg: 'bg-blue-600/10 dark:bg-blue-600/20',
      bgHover: 'hover:bg-blue-600/10',
      text: 'text-blue-500',
      dot: 'bg-blue-500',
    },
    finished: {
      bg: 'bg-green-600/10 dark:bg-green-600/20',
      bgHover: 'hover:bg-green-600/10',
      text: 'text-green-500',
      dot: 'bg-green-500',
    },
    user: {
      bg: 'bg-green-600/10 dark:bg-green-600/20',
      bgHover: 'hover:bg-green-600/10',
      text: 'text-green-500',
      dot: 'bg-green-500',
    },
    admin: {
      bg: 'bg-blue-600/10 dark:bg-blue-600/20',
      bgHover: 'hover:bg-blue-600/10',
      text: 'text-blue-500',
      dot: 'bg-blue-500',
    },
    teacher: {
      bg: 'bg-yellow-600/10 dark:bg-yellow-600/20',
      bgHover: 'hover:bg-yellow-600/10',
      text: 'text-yellow-500',
      dot: 'bg-yellow-500',
    },
    default: {
      bg: 'bg-slate-600/10 dark:bg-slate-600/20',
      bgHover: 'hover:bg-slate-600/10',
      text: 'text-slate-500',
      dot: 'bg-slate-500',
    },
  };

  const normalizedStr = status.value.toLowerCase().trim();
  return colorMap[normalizedStr] || colorMap['default'];
};

export default function MyBadge({
  status,
  className,
}: {
  status: IStatusObj;
  className?: string;
}) {
  const colors = stringToColor(status);
  const locale = getCurrentLocale();

  return (
    <Badge
      className={`${colors.bg} ${colors.bgHover} ${colors.text} shadow-none rounded-full ${className}`}
    >
      <div className={`h-1.5 w-1.5 rounded-full ${colors.dot} mr-2`} />
      {locale === 'vi' ? status.label : status.labelEn}
    </Badge>
  );
}
