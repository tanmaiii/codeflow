import { Notification } from '@/interfaces/notification.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';

type NotificationCreationAttributes = Optional<Notification, 'id' | 'title' | 'message' | 'userId' | 'isRead' | 'link' | 'type'>;

export class NotificationModel extends Model<Notification, NotificationCreationAttributes> implements Notification {
  public id: string;
  public title: string;
  public message: string;
  public userId: string;
  public isRead: boolean;
  public link: string;
  public type: 'TOPIC_EVALUATION' | 'TOPIC_COMMENT' | 'TOPIC_UPDATE' | 'SYSTEM';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof NotificationModel {
  NotificationModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      message: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      isRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      link: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM('TOPIC_EVALUATION', 'TOPIC_COMMENT', 'TOPIC_UPDATE', 'SYSTEM'),
      },
    },
    {
      sequelize,
      tableName: 'notifications',
      modelName: 'notifications',
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
        ],
      },
    },
  );

  return NotificationModel;
}
