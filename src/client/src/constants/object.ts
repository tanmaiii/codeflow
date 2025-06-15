import { ENUM_STATUS_TOPIC, ENUM_TYPE_COURSE, ENUM_TYPE_NOTIFICATION, ROLE } from './enum';

export interface IStatusObj {
  value: string;
  labelKey: string; // Changed from label to labelKey for i18n
}

// Utility function to get localized label
export const getLocalizedLabel = (obj: IStatusObj, t: (key: string) => string): string => {
  return t(obj.labelKey);
};

export const STATUS_TOPIC: IStatusObj[] = [
  {
    value: ENUM_STATUS_TOPIC.PENDING,
    labelKey: 'topic.pending',
  },
  {
    value: ENUM_STATUS_TOPIC.APPROVED,
    labelKey: 'topic.approved',
  },
  {
    value: ENUM_STATUS_TOPIC.REJECTED,
    labelKey: 'topic.rejected',
  },
];

export const STATUS_TOPIC_CUSTOM: IStatusObj[] = [
  {
    value: 'custom',
    labelKey: 'topic.custom',
  },
  {
    value: 'suggest',
    labelKey: 'topic.suggest',
  },
];

export const STATUS_HIDDEN: IStatusObj[] = [
  {
    value: 'hidden',
    labelKey: 'common.hidden',
  },
  {
    value: 'visible',
    labelKey: 'common.visible',
  },
];

export const STATUS_COURSE: IStatusObj[] = [
  {
    value: 'not_started',
    labelKey: 'course.notStarted',
  },
  {
    value: 'started',
    labelKey: 'course.started',
  },
  {
    value: 'finished',
    labelKey: 'course.finished',
  },
];

export const ROLE_USER: IStatusObj[] = [
  {
    value: ROLE.USER,
    labelKey: 'role.user',
  },
  {
    value: ROLE.ADMIN,
    labelKey: 'role.admin',
  },
  {
    value: ROLE.TEACHER,
    labelKey: 'role.teacher',
  },
];

export const TYPE_COURSE: IStatusObj[] = [
  {
    value: ENUM_TYPE_COURSE.MAJOR,
    labelKey: 'course.type.major',
  },
  {
    value: ENUM_TYPE_COURSE.FOUNDATION,
    labelKey: 'course.type.foundation',
  },
  {
    value: ENUM_TYPE_COURSE.THESIS,
    labelKey: 'course.type.thesis',
  },
  {
    value: ENUM_TYPE_COURSE.ELECTIVE,
    labelKey: 'course.type.elective',
  },
];

export const ROLE_TOPIC: IStatusObj[] = [
  {
    value: 'leader',
    labelKey: 'topic.role.leader',
  },
  {
    value: 'member',
    labelKey: 'topic.role.member',
  },
];

export const NOTIFICATION_TYPE: IStatusObj[] = [
  {
    value: ENUM_TYPE_NOTIFICATION.TOPIC_EVALUATION,
    labelKey: 'notification.type.topicEvaluation',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.COMMENT,
    labelKey: 'notification.type.comment',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.COMMENT_REPLY,
    labelKey: 'notification.type.commentReply',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.LIKE_POST,
    labelKey: 'notification.type.likePost',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.JOIN_COURSE,
    labelKey: 'notification.type.joinCourse',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.REGISTER_TOPIC,
    labelKey: 'notification.type.registerTopic',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.APPROVE_TOPIC,
    labelKey: 'notification.type.approveTopic',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.REJECT_TOPIC,
    labelKey: 'notification.type.rejectTopic',
  },
  {
    value: ENUM_TYPE_NOTIFICATION.SYSTEM,
    labelKey: 'notification.type.system',
  },
];
