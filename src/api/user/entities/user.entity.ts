import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { WorkField } from '../../work-field/entities/work-field.entity';

export enum UserTypeEnum {
  MENTOR = 'mentor',
  MENTEE = 'mentee',
}

@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => WorkField)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  workFieldId?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserTypeEnum)),
    allowNull: false,
  })
  type: UserTypeEnum;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  shortDescription: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  education: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  experience: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  about: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @BelongsTo(() => WorkField)
  workField: WorkField;
}
