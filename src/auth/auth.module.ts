import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {DatabaseModule} from "../database.module";
import {authProviders} from "./entities/auth.providers";
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "../user/user.module";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
   imports: [DatabaseModule, ConfigModule, UserModule,JwtModule],
   controllers: [AuthController],
   providers: [AuthService, ...authProviders],
})
export class AuthModule {
}
