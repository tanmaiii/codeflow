import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Submission } from '../interfaces/submissions.interface';

type SubmissionCreationAttributes = Optional<Submission, 'id' | 'groupId' | 'topicId' | 'commit_hash' | 'evaluation' | 'submittedAt'>;

export class SubmissionModel extends Model<Submission, SubmissionCreationAttributes> implements Submission {
  public id: string;
  public groupId: string;
  public topicId: string;
  public commit_hash: string;
  public evaluation: string;
  public submittedAt: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SubmissionModel {
  SubmissionModel.init(
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
      topicId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
      commit_hash: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      evaluation: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      submittedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'submissions',
      modelName: 'submissions',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
    },
  );

  return SubmissionModel;
}
