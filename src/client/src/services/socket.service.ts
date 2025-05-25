import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;
  private notificationHandlers: ((notification: Notification) => void)[] = [];

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(userId: string) {
    if (this.socket?.connected) return;

    this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', {
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      // Xác thực user sau khi kết nối thành công
      this.socket?.emit('authenticate', userId);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Lắng nghe thông báo mới
    this.socket.on('new_notification', (notification: Notification) => {
      console.log('New notification received:', notification);
      this.notificationHandlers.forEach(handler => handler(notification));
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public onNotification(handler: (notification: Notification) => void) {
    this.notificationHandlers.push(handler);
    return () => {
      this.notificationHandlers = this.notificationHandlers.filter(h => h !== handler);
    };
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default SocketService.getInstance(); 