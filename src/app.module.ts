import {Module} from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from 'node:path';
import {TransformResponseInterceptor} from "./interceptor/response.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {UserModule} from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: `.env`,
         isGlobal: true,
      }),
      ServeStaticModule.forRoot({
         rootPath: path.join(__dirname, '../public'),
      }),
      UserModule,
      AuthModule,
   ],
   providers: [
      {
         provide: APP_INTERCEPTOR,
         useClass: TransformResponseInterceptor,
      },
   ],
})
export class AppModule {
}
