import {Table, Column, Model, DataType, HasOne} from 'sequelize-typescript';
import {Auth} from "../../auth/entities/auth.entity";

@Table
export class User extends Model {
   @Column({
      allowNull: false,
      type: DataType.STRING(255)
   })
   firstName: string;

   @Column({
      allowNull: false,
      type: DataType.STRING(255)
   })
   email: string;

   @Column({
      allowNull: false,
      type: DataType.STRING(127),
   })
   password: string;

   @Column({
      allowNull: true,
      type: DataType.BOOLEAN
   })
   isActive?: boolean;

   @HasOne(() => Auth) // Define one-to-one association with Auth entity
   auth: Auth;

   // Define a getter method to exclude 'password' from JSON serialization
   get publicData() {
      return {
         id: this.id,
         firstName: this.firstName,
         email: this.email,
         isActive: this.isActive
      };
   }
}