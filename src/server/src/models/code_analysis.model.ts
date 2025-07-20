import { CodeAnalysis } from '@/interfaces/code_analysis.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { TopicModel } from './topics.model';
import { ReposModel } from './repos.model';
import { CodeAnalysisMetricsModel } from './code_analysis_metrics.model';

export type CodeAnalysisCreationAttributes = Optional<
  CodeAnalysis,
  | 'id'
  | 'status'
  | 'analyzedAt'
  | 'workflowRunId'
>;

export class CodeAnalysisModel extends Model<CodeAnalysis, CodeAnalysisCreationAttributes> implements CodeAnalysis {
  public id!: string;
  public reposId!: string;
  public branch!: string;
  public commitSha!: string;
  public status!: string;
  public analyzedAt!: Date;
  public workflowRunId!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CodeAnalysisModel {
  CodeAnalysisModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      reposId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'repos',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      branch: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      commitSha: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      analyzedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      workflowRunId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: 'CodeAnalysis',
      tableName: 'code_analysis',
      timestamps: true,
      defaultScope: {
        include: [
          {
            model: ReposModel,
            as: 'repos',
          },
          {
            model: CodeAnalysisMetricsModel,
            as: 'metrics',
          },
        ],
      },
    },
  );
  return CodeAnalysisModel;
}
