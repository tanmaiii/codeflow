import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Topic } from '@interfaces/topics.interface';
import { UserModel } from './users.model';
import { TagModel } from './tags.model';
import { ENUM_TOPIC_STATUS } from '@/data/enum';

type PostCreationAttributes = Optional<Topic, 'id' | 'title' | 'description' | 'courseId' | 'teacherId' | 'authorId' | 'isCustom' | 'status'>;

export class TopicModel extends Model<Topic, PostCreationAttributes> implements Topic {
  public id!: string;
  public title!: string;
  public description!: string;
  public courseId!: string;
  public authorId!: string;
  public teacherId!: string;
  public isCustom!: boolean;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TopicModel {
  TopicModel.init(
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
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      courseId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      teacherId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      authorId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      isCustom: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ENUM_TOPIC_STATUS)),
        defaultValue: ENUM_TOPIC_STATUS.APPROVED,
      },
    },
    {
      sequelize,
      tableName: 'topics',
      modelName: 'topics',
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
          {
            model: UserModel,
            as: 'teacher',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
          {
            model: TagModel,
            as: 'tags',
            through: { attributes: [] },
          },
        ],
      },
    },
  );

  return TopicModel;
}
