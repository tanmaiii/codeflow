import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';
import { ENUM_USER_ROLE, ENUM_USER_STATUS } from '@/data/enum';

export type UserCreationAttributes = Optional<
  User,
  'id' | 'uid' | 'email' | 'name' | 'password' | 'username' | 'role' | 'status' | 'avatar'
>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id!: string;
  public uid!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public username!: string;
  public role!: string;
  public status!: string;
  public avatar!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      uid: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      role: {
        allowNull: true,
        type: DataTypes.ENUM(...Object.values(ENUM_USER_ROLE)),
      },
      status: {
        allowNull: true,
        type: DataTypes.ENUM(...Object.values(ENUM_USER_STATUS)),
        defaultValue: 'active',
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'users',
      modelName: 'users',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        withPassword: {
          attributes: {
            include: ['password'],
          },
        },
      },
    },
  );

  return UserModel;
}
