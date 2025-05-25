export interface Notification {
  id: string;
  type: 'TOPIC_EVALUATION' | 'TOPIC_COMMENT' | 'TOPIC_UPDATE' | 'SYSTEM';
  title: string;
  message: string;
  userId?: string;
  isRead: boolean;
  link: string;
}
