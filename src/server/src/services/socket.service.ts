import { Notification } from '@/interfaces/notification.interface';
import { logger } from '@/utils/logger';
import { Server, Socket } from 'socket.io';
import { Service } from 'typedi';

@Service()
export class SocketService {
  private io: Server;
  private userSockets: Map<string, Socket[]> = new Map();

  public initialize(io: Server) {
    this.io = io;
    this.setupSocketHandlers();
  }

  private setupSocketHandlers() {
    this.io.on('connection', (socket: Socket) => {
      logger.info(`[🚀SOCKET🚀] Client connected: ${socket.id}`);

      // Handle user authentication and store socket
      socket.on('authenticate', (userId: string) => {
        this.addUserSocket(userId, socket);
        logger.info(`[🚀SOCKET🚀] User ${userId} authenticated with socket ${socket.id}`);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        this.removeUserSocket(socket);
        logger.info(`[🚀SOCKET🚀] Client disconnected: ${socket.id}`);
      });
    });
  }

  private addUserSocket(userId: string, socket: Socket) {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, []);
    }
    this.userSockets.get(userId)?.push(socket);
  }

  private removeUserSocket(socket: Socket) {
    for (const [userId, sockets] of this.userSockets.entries()) {
      const index = sockets.findIndex(s => s.id === socket.id);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.userSockets.delete(userId);
        }
        break;
      }
    }
  }

  public emitNotification(userId: string, notification: Notification) {
    logger.info(`[🚀SOCKET🚀] ${userId}`);
    const userSockets = this.userSockets.get(userId);
    if (userSockets) {
      userSockets.forEach(socket => {
        logger.info(`[🚀SOCKET🚀] Emitting notification to user ${userId} with socket ${socket.id}`);
        socket.emit('new_notification', notification);
      });
    }
  }

  public emitNotificationToAll(notification: Notification) {
    logger.info(`[🚀SOCKET🚀] Emitting notification to all users`);
    this.io.emit('new_notification', notification);
  }
} 