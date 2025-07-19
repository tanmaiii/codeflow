import { CodeAnalysis } from '@/interfaces/code_analysis.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type CodeAnalysisCreationAttributes = Optional<
  CodeAnalysis,
  | 'id'
  | 'reposId'
  | 'branch'
  | 'commitSha'
  | 'qualityGate'
  | 'bugs'
  | 'vulnerabilities'
  | 'codeSmells'
  | 'coverage'
  | 'duplicatedLinesDensity'
  | 'securityRating'
  | 'linesOfCode'
  | 'url'
>;

export class CodeAnalysisModel extends Model<CodeAnalysis, CodeAnalysisCreationAttributes> implements CodeAnalysis {
  public id!: string;
  public reposId!: string;
  public branch!: string;
  public commitSha!: string;
  public qualityGate!: string;
  public bugs!: number;
  public vulnerabilities!: number;
  public codeSmells!: number;
  public coverage!: number;
  public duplicatedLinesDensity!: number;
  public securityRating!: number;
  public linesOfCode!: number;
  public url!: string;

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
      qualityGate: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      bugs: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      vulnerabilities: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      codeSmells: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      coverage: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      duplicatedLinesDensity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      securityRating: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      linesOfCode: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: 'CodeAnalysis',
      tableName: 'code_analysis',
      timestamps: true,
    },
  );
  return CodeAnalysisModel;
}
