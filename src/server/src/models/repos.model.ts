import { Repos } from '@/interfaces/repos.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

type ReposCreationAttributes = Optional<Repos, 'id' | 'name' | 'url' | 'courseId' | 'topicId'>;

export class ReposModel extends Model<Repos, ReposCreationAttributes> implements Repos {
  public id: string;
  public name: string;
  public url: string;
  public courseId: string;
  public topicId: string;
}

export default function (sequelize: Sequelize): typeof ReposModel {
  ReposModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      topicId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
    },
    {
      tableName: 'repos',
      modelName: 'repos',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return ReposModel;
}
