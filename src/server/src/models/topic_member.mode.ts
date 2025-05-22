import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { TopicMember } from '@/interfaces/topics.interface';

export type TopicMemberCreationAttributes = Optional<TopicMember, 'id' | 'topicId' | 'userId' | 'role'>;

export class TopicMemberModel extends Model<TopicMember, TopicMemberCreationAttributes> implements TopicMember {
  public id: string;
  public topicId: string;
  public userId: string;
  public role: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TopicMemberModel {
  TopicMemberModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      topicId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('leader', 'member'),
      },
    },
    {
      tableName: 'topic_members',
      modelName: 'topic_members',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return TopicMemberModel;
}
