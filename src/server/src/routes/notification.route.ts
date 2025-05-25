import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { NotificationController } from '@/controllers/notification.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateNotificationDto } from '@/dtos/notification.dto';

export class NotificationRoute implements Routes {
  public path = '/notifications';
  public router = Router();
  public notificationController = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.path, AuthMiddleware);
    this.router.get(`${this.path}`, this.notificationController.getNotifications);
    this.router.get(`${this.path}/user`, this.notificationController.getNotificationsByUserId);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateNotificationDto), this.notificationController.createNotification);
    this.router.delete(`${this.path}/:id`, this.notificationController.deleteNotification);
  }
}
