import { ENUM_TYPE_COURSE } from "@/constants/enum";
import { IStatusObj } from "@/constants/object";
import { IComment } from "@/interfaces/comment";

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

export function util_remove_html_tags(content: string): string {
  return content.replace(/<[^>]*>?/g, '');
}

/**
 * Tính thời gian đọc của bài viết dựa theo độ dài của bài viết
 * @param content Nội dung bài viết
 * @returns Thời gian đọc ước tính (phút)
 */
export function util_CalculateReadingTime(content: string): number {
  // Giả sử tốc độ đọc trung bình là 200 từ/phút
  const WORDS_PER_MINUTE = 200;
  
  // Đếm số từ trong nội dung
  const wordCount = content.trim().split(/\s+/).length;
  
  // Tính thời gian đọc
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  // Trả về ít nhất 1 phút nếu nội dung quá ngắn
  return Math.max(1, readingTime);
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

/**
 * Format số thông báo để hiển thị "9+" nếu lớn hơn 9
 * @param count - Số lượng thông báo
 * @returns Chuỗi đã format (ví dụ: "5", "9+")
 */
export function util_format_number(count: number, max: number = 9): string {
  return count > max ? `${max}+` : count.toString();
}


/**
 * Remove Vietnamese diacritics and special characters, convert to lowercase
 * @param str - Input string with Vietnamese diacritics
 * @returns Clean string without diacritics and special characters
 */
export const removeVietnameseDiacritics = (str: string): string => {
  return str
    .normalize('NFD') // Tách ký tự và dấu (e.g., "ế" -> "e + ́")
    .replace(/[\u0300-\u036f]/g, '') // Xoá dấu
    .replace(/đ/g, 'd') // Chuyển đ -> d
    .replace(/Đ/g, 'd') // Chuyển Đ -> d
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Xoá ký tự đặc biệt
    .replace(/\s+/g, ''); // Xoá khoảng trắng
};

/**
 * Clean special characters like \n, \r, \t, and other control characters from string
 * @param str - Input string that may contain special characters
 * @returns Clean string without special characters
 */
export const cleanSpecialCharacters = (str: string): string => {
  if (!str || typeof str !== 'string') return '';

  return str
    .replace(/[\r\n\t]/g, ' ') // Replace newlines, carriage returns, and tabs with spaces
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading and trailing whitespace
};

/**
 * Format repository name
 * @param type - Type of course
 * @param name - Name of course
 * @param groupName - Group name of course
 * @returns Formatted repository name
 */
export const util_repos_name = ({ type, name, groupName }: { type: ENUM_TYPE_COURSE; name: string; groupName?: string }) => {
  if (!name) {
    throw new Error('Name and groupName are required');
  }
  // Format name and groupName to remove diacritics and special characters
  const formattedName = removeVietnameseDiacritics(name.trim());
  const formattedgroupName = groupName ? removeVietnameseDiacritics(groupName.trim()) : '';

  // type: csn, cn, kl, mh
  let nameRepo = '';

  if (type === ENUM_TYPE_COURSE.MAJOR) {
    nameRepo = `cn-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  } else if (type === ENUM_TYPE_COURSE.FOUNDATION) {
    nameRepo = `csn-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  } else if (type === ENUM_TYPE_COURSE.ELECTIVE) {
    nameRepo = `mh-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  } else if (type === ENUM_TYPE_COURSE.THESIS) {
    nameRepo = `kl-${formattedName}${formattedgroupName ? `-${formattedgroupName}` : ''}`;
  }

  return nameRepo;
};
