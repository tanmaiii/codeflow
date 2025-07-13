import { CommitReviews, ReviewType } from '@/interfaces/commits.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type CommitReviewsCreationAttributes = Optional<CommitReviews, 'id' | 'commitId' | 'reviewType' | 'score' | 'reviewerId' | 'feedback' | 'summary'>;

export class CommitReviewsModel extends Model<CommitReviews, CommitReviewsCreationAttributes> implements CommitReviews {
  public id!: string;
  public commitId!: string;
  public reviewType!: ReviewType;
  public score!: number;
  public reviewerId!: string;
  public feedback!: string;
  public summary!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CommitReviewsModel {
  CommitReviewsModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      commitId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      reviewType: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ReviewType)),
      },
      score: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      feedback: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      reviewerId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      summary: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'commit_reviews',
      tableName: 'commit_reviews',
      timestamps: true,
    },
  );
  return CommitReviewsModel;
}
