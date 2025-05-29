import { IStatusObj } from "@/constants/object";
import { IComment } from "@/interfaces/comment";
import { getCurrentLocale } from '@/lib/utils';

export function util_length_comment(comments: IComment[]): number {
  return comments.length > 0
    ? comments.reduce((total: number, comment: IComment) => {
        // Count this comment
        let count = 1;
        // Add counts of nested replies if any
        if (comment.replies?.length) {
          count += comment.replies.length;
          // Recursively count deeper nested replies
          comment.replies.forEach((nestedReply: IComment) => {
            if (nestedReply.replies?.length) {
              count += nestedReply.replies.length;
            }
          });
        }
        return total + count;
      }, 0)
    : 0;
}

/**
 * Lấy label của đối tượng dựa trên value và ngôn ngữ hiện tại
 * @param obj - Mảng đối tượng có value và label
 * @param value - Giá trị value của đối tượng
 * @returns Label của đối tượng
 */
export function util_get_locale_label(obj: IStatusObj[], value: string): string {
  const locale = getCurrentLocale();
  return obj.find((item) => item.value === value)?.[locale === 'en' ? 'labelEn' : 'label'] || ''; 
}

/**
 * Chuyển đổi đối tượng thành mã màu
 * @param obj Đối tượng cần chuyển đổi
 * @returns Mã màu dạng tailwind
 */
export function util_object_to_color(obj: IStatusObj) {
  let hash = 0;
  for (let i = 0; i < obj.value.length; i++) {
    hash = obj.value.charCodeAt(i) + ((hash << 5) - hash);
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

  const normalizedStr = obj.value.toLowerCase().trim();
  return colorMap[normalizedStr] || colorMap['default'];
}
