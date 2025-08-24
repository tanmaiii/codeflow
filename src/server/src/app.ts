import { LOG_FORMAT, NODE_ENV, PORT } from '@config';
import { DB } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet'; // bảo vệ header
import hpp from 'hpp'; // bảo vệ header
import { createServer } from 'http';
import morgan from 'morgan'; // log request
import path from 'path';
import 'reflect-metadata';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Container } from 'typedi';
import { SocketService } from './services/socket.service';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private httpServer: any;
  private io: Server;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeApp(routes);
  }

  private async initializeApp(routes: Routes[]) {
    try {
      await this.connectToDatabase();
      logger.info('Database connection established successfully');
      
      logger.info('Initializing middlewares...');
      this.initializeMiddlewares();
      
      logger.info('Initializing routes...');
      this.initializeRoutes(routes);
      
      logger.info('Initializing swagger...');
      this.initializeSwagger();
      
      logger.info('Initializing error handling...');
      this.initializeErrorHandling();
      
      logger.info('Initializing socket...');
      this.initializeSocketIO();
      
      logger.info('App initialization completed successfully');
    } catch (error) {
      logger.error('Failed to initialize app:', error);
      console.trace(error);
      process.exit(1);
    }
  }

  private initializeSocketIO() {
    this.httpServer = createServer(this.app);
    logger.info('HTTP server created successfully');
    // Temporarily disable socket.io to debug - just create http server
  }

  public listen() {
    try {
      if (!this.httpServer) {
        this.httpServer = createServer(this.app);
      }
      this.httpServer.listen(this.port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
      });

      this.httpServer.on('error', (error: any) => {
        logger.error('Server error:', error);
      });

      // Add global error handlers
      process.on('uncaughtException', (error) => {
        logger.error('Uncaught Exception:', error);
        process.exit(1);
      });

      process.on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      // Test database connection without sync
      await DB.sequelize.authenticate();
      logger.info('Database connection has been established successfully.');
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  private initializeMiddlewares() {
    // Rate limiting
    // const limiter = rateLimit({
    //   windowMs: 15 * 60 * 1000, // 15 minutes
    //   max: 100, // Limit each IP to 100 requests per windowMs
    // });

    // // Apply rate limiting to all requests

    // this.app.use(limiter);

    this.app.use(
      cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
      }),
    );
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // Cho phép truy cập file ảnh tĩnh từ /public
    this.app.use('/public/images', express.static(path.join(__dirname, '../uploads/images')));
    this.app.use('/public/files', express.static(path.join(__dirname, '../uploads/files')));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'CodeFlow API',
          version: '1.0.1',
          description: 'CodeFlow API',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
