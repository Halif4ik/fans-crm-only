import {Module} from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from 'node:path';
import {PrismaService} from "./prisma.service";
import {FileService} from "./file.service";
import { UserModule } from './user/user.module';
import {TransformResponseInterceptor} from "./interceptor/response.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
   imports: [ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
   }),
      ServeStaticModule.forRoot({
         rootPath: path.join(__dirname, '../public'),
      }),
      UserModule,],
   providers: [PrismaService, FileService,
      {
         provide: APP_INTERCEPTOR,
         useClass: TransformResponseInterceptor,
      }],
})
export class AppModule {
}
