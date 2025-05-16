import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Group } from '@/interfaces/groups.interface';
import { UserModel } from './users.model';
import { GroupMemberModel } from './groups_member.model';
import { TopicModel } from './topics.model';

export type GroupCreationAttributes = Optional<Group, 'id' | 'name' | 'topicId' | 'authorId'>;

export class GroupModel extends Model<Group, GroupCreationAttributes> implements Group {
  public id: string;
  public name: string;
  public topicId: string;
  public authorId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof GroupModel {
  GroupModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      topicId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
      authorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'groups',
      modelName: 'groups',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'author',
          },
          {
            model: GroupMemberModel,
            as: 'members',
            include: [
              {
                model: UserModel,
                as: 'user',
              },
            ],
          },
        ],
      },
    },
  );

  return GroupModel;
}
