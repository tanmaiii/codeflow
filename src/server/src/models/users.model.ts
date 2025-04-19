import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'name' | 'password' | 'username' | 'role' | 'status' | 'avatar'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: string;
  public email: string;
  public password: string;
  public name: string;
  public username: string;
  public role: string;
  public status: string;
  public avatar: string;

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
        type: DataTypes.ENUM('admin', 'user', 'teacher'),
      },
      status: {
        allowNull: true,
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active',
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
