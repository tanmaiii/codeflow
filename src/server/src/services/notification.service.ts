import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { Notification } from '@/interfaces/notification.interface';
import { NotificationModel } from '@/models/notification.model';
import { Service } from 'typedi';
import { SocketService } from './socket.service';
@Service()
export class NotificationService {
  constructor(private socketService: SocketService) {}

  public async findAll(): Promise<NotificationModel[]> {
    const allNotifications: NotificationModel[] = await DB.Notifications.findAll();
    return allNotifications;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: Notification[] }> {
    const { count, rows }: { count: number; rows: Notification[] } = await DB.Notifications.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findAndCountAllWithPaginationByUserId(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<{ count: number; rows: Notification[] }> {
    const { count, rows }: { count: number; rows: Notification[] } = await DB.Notifications.findAndCountAll({
      where: { userId },
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findNotificationById(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    return findNotification;
  }

  public async findNotificationsByUserId(userId: string): Promise<Notification[]> {
    const findNotifications: Notification[] = await DB.Notifications.findAll({ where: { userId } });
    return findNotifications;
  }

  public async readNotification(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.update({ isRead: true }, { where: { id: notificationId } });
    return findNotification;
  }

  public async createNotification(notificationData: Partial<Notification>): Promise<Notification> {
    const createNotificationData: Notification = await DB.Notifications.create(notificationData);

    // Emit notification to specific user if userId is provided
    if (notificationData.userId) {
      this.socketService.emitNotification(notificationData.userId, createNotificationData);
    } else {
      // Emit to all users if no specific userId
      this.socketService.emitNotificationToAll(createNotificationData);
    }

    return createNotificationData;
  }

  public async updateNotification(notificationId: string, notificationData: Partial<Notification>): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.update(notificationData, { where: { id: notificationId } });

    const updateNotification: Notification = await DB.Notifications.findByPk(notificationId);
    return updateNotification;
  }

  public async deleteNotification(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId);
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.destroy({ where: { id: notificationId } });

    const softDeletedNotification: Notification = await DB.Notifications.findByPk(notificationId);
    return softDeletedNotification;
  }

  public async destroyNotification(notificationId: string): Promise<Notification> {
    const findNotification: Notification = await DB.Notifications.findByPk(notificationId, { paranoid: false });
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    await DB.Notifications.destroy({ force: true, where: { id: notificationId } });

    return findNotification;
  }
}
