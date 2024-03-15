import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {userProviders} from "./entities/user.providers";
import {DatabaseModule} from "../database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService]
})
export class UserModule {}
