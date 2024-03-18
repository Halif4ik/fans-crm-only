import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {userProviders} from "./entities/user.providers";
import {DatabaseModule} from "../database.module";
import { JwtStrategyAuth } from "../auth/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [DatabaseModule,ConfigModule,JwtModule,PassportModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders,JwtStrategyAuth],
  exports: [UserService]
})
export class UserModule {}
