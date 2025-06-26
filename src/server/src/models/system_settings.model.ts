import { SystemSettings } from '@/interfaces/system_settings.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type SystemSettingsCreationAttributes = Optional<SystemSettings, 'id'>;

export class SystemSettingsModel extends Model<SystemSettings, SystemSettingsCreationAttributes> implements SystemSettings {
  public id!: string;
  public key!: string;
  public value!: string;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SystemSettingsModel {
  SystemSettingsModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true,
      },
      value: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING(50),
        defaultValue: 'text',
      },
    },
    {
      tableName: 'system_settings',
      modelName: 'system_settings',
      sequelize,
      timestamps: true,
      paranoid: false,
    },
  );

  return SystemSettingsModel;
} 