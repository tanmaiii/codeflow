import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Group } from '@/interfaces/groups.interface';

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
    },
  );

  return GroupModel;
}
