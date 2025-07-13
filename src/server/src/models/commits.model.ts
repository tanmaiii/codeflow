import { Commits } from '@/interfaces/commits.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type CommitsCreationAttributes = Optional<Commits, 'id' | 'repoId' | 'commitHash' | 'message' | 'authorId' | 'url'>;

export class CommitsModel extends Model<Commits, CommitsCreationAttributes> implements Commits {
  public id!: string;
  public repoId!: string;
  public commitHash!: string;
  public message!: string;
  public authorId!: string;
  public date!: Date;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommitsModel {
  CommitsModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      repoId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'repos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      commitHash: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      authorId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: 'commits',
      tableName: 'commits',
      timestamps: true,
    },
  );
  return CommitsModel;
}
