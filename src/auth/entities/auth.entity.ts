import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table
export class Auth extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING(255),
    unique: true,
  })
  action_token: string;

  @Column
  refreshToken: string;

  @Column
  accessToken: string;

  @CreatedAt
  createAt: Date;

  @UpdatedAt
  updateAt: Date;

  @ForeignKey(() => User) // Define foreign key for the one-to-one relationship
  @Column
  userId: number;
}
