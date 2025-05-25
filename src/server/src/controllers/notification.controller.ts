import { CreateNotificationDto } from '@/dtos/notification.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ENUM_TYPE_NOTIFICATION } from '@/interfaces/notification.interface';
import { NotificationService } from '@/services/notification.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class NotificationController {
  public notification = Container.get(NotificationService);

  public getNotifications = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const notifications = await this.notification.findAndCountAllWithPagination(10, 0);
      res.status(200).json({ data: notifications, message: 'getNotifications' });
    } catch (error) {
      next(error);
    }
  };

  public getNotificationsByUserId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const notifications = await this.notification.findAndCountAllWithPaginationByUserId(userId, 10, 0);
      res.status(200).json({ data: notifications, message: 'getNotifications' });
    } catch (error) {
      next(error);
    }
  };

  public readNotification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationId = req.params.id;
      const notification = await this.notification.readNotification(notificationId);
      res.status(200).json({ data: notification, message: 'readNotification' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNotification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationId = req.params.id;

      await this.notification.deleteNotification(notificationId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public createNotification = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notificationData: CreateNotificationDto = req.body;
      const userId = req.user.id;
      const notification = await this.notification.createNotification({
        ...notificationData,
        type: notificationData.type as ENUM_TYPE_NOTIFICATION,
        userId: userId,
      });
      res.status(201).json({ data: notification, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
