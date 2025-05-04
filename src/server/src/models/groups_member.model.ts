import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { GroupMember } from '@/interfaces/groups.interface';

export type GroupCreationAttributes = Optional<GroupMember, 'id' | 'groupId' | 'userId' | 'role'>;

export class GroupMemberModel extends Model<GroupMember, GroupCreationAttributes> implements GroupMember {
  public id: string;
  public groupId: string;
  public userId: string;
  public role: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof GroupMemberModel {
  GroupMemberModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      groupId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'groups',
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
        type: DataTypes.ENUM('admin', 'member'),
      },
    },
    {
      tableName: 'group_members',
      modelName: 'group_members',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return GroupMemberModel;
}
