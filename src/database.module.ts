import {Sequelize} from 'sequelize-typescript';
import {User} from "./user/entities/user.entity";
import {config} from 'dotenv'
import {ConfigService} from "@nestjs/config";

config()
const configService = new ConfigService();

export const databaseProviders = [
   {
      provide: 'SEQUELIZE',
      useFactory: async () => {
         const sequelize = new Sequelize({
            dialect: 'mysql',
            host: configService.get<string>('MUSKUL_HOST'),
            port: configService.get<number>('MYSQLDB_DOCKER_PORT'),
            username: configService.get<string>('MYSQLDB_USER'),
            password: configService.get<string>('MYSQLDB_ROOT_PASSWORD'),
            database: configService.get<string>('MYSQLDB_DATABASE'),
         });
         sequelize.addModels([User]);
         await sequelize.sync();
         return sequelize;
      },
   },
];