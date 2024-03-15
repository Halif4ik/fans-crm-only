import {Sequelize} from 'sequelize-typescript';
import {User} from "./user/entities/user.entity";
import {config} from 'dotenv'
import {ConfigService} from "@nestjs/config";
import {Auth} from "./auth/entities/auth.entity";

config()
const configService = new ConfigService();

export const databaseProviders = [
   {
      provide: 'SEQUELIZE',
      useFactory: async (): Promise<Sequelize> => {
         const sequelize: Sequelize = new Sequelize({
            dialect: 'mysql',
            host: configService.get<string>('MUSKUL_HOST'),
            port: configService.get<number>('MYSQLDB_DOCKER_PORT'),
            username: configService.get<string>('MYSQLDB_USER'),
            password: configService.get<string>('MYSQLDB_ROOT_PASSWORD'),
            database: configService.get<string>('MYSQLDB_DATABASE'),
            logging: false,
         });
         sequelize.addModels([User, Auth]);

         await sequelize.sync();
         return sequelize;
      },
   },
];