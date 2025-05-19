import { CourseEnrollment } from '@/interfaces/courses.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserModel } from './users.model';
export type CourseEnrollmentCreationAttributes = Optional<CourseEnrollment, 'id' | 'courseId' | 'userId' | 'status'>;

export class CourseEnrollmentModel extends Model<CourseEnrollment, CourseEnrollmentCreationAttributes> implements CourseEnrollment {
  public id: string;
  public courseId: string;
  public userId: string;
  public status: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CourseEnrollmentModel {
  CourseEnrollmentModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      courseId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'courses',
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
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'course_enrollments',
      modelName: 'course_enrollments',
      sequelize,
      timestamps: true,
      paranoid: true, // bật xóa mềm
      defaultScope: {
        include: [
          {
            model: UserModel,
            as: 'user',
            attributes: ['id', 'name', 'username', 'role', 'avatar'], // Replace with actual attribute names of UserModel
          },
        ],
      },
    },
  );

  return CourseEnrollmentModel;
}
