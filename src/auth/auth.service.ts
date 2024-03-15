import {Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {User} from "../user/entities/user.entity";
import {Auth} from "./entities/auth.entity";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {LoginAuthDto} from "./dto/login-auth.dto";
import * as bcrypt from "bcryptjs";
import {TJwtBody} from "./dto/responce-auth.dto";

@Injectable()
export class AuthService {
   private readonly logger: Logger = new Logger(AuthService.name);

   constructor(
       @Inject('AUTH_REPOSITORY') private authRepository: typeof Auth,
       private readonly configService: ConfigService, private userService: UserService,
       private jwtService: JwtService,
   ) {
   }

   async login(loginDto: LoginAuthDto): Promise<Auth> {
      // should rewrite all tokens return one token
      const userFromBd: User | null = await this.userService.getUserByEmailWithAuth(loginDto.email);

      if (!userFromBd) throw new UnauthorizedException({message: "Incorrect credentials"});
      const passwordCompare: boolean = await bcrypt.compare(loginDto.password, userFromBd.password);
      if (!passwordCompare) throw new UnauthorizedException({message: "Incorrect credentials"});

      /*contain auth table */
      let authData: Auth | undefined = userFromBd.auth;
      console.log('authData-', authData);

      const jwtBody: TJwtBody = {
         email: userFromBd.email,
         id: userFromBd.id,
         firstName: userFromBd.firstName,
      }
      const action_token: string = this.jwtService.sign(jwtBody,
          {
             expiresIn: this.configService.get<string>("EXPIRE_ACTION"),
             secret: this.configService.get<string>("SECRET_ACTION")
          });
      const refreshToken: string = this.jwtService.sign(jwtBody,
          {
             expiresIn: this.configService.get<string>("EXPIRE_REFRESH"),
             secret: this.configService.get<string>("SECRET_REFRESH")
          });
      const accessToken: string = this.jwtService.sign(jwtBody,
          {
             expiresIn: this.configService.get<string>("EXPIRE_ACCESS"),
             secret: this.configService.get<string>("SECRET_ACCESS")
          });

      let authUserDataSave: Auth;
      if (authData) {
         await this.authRepository.update(
             {refreshToken, accessToken, action_token}, {where: {id: authData.id}});
         authUserDataSave = authData;
         this.logger.log(`Updated tokens for userId- ${userFromBd.id}`);
      } else {
         const authDataNewUser: Auth = await this.authRepository.create({
            refreshToken,
            accessToken,
            action_token,
            userId: userFromBd.id,
         });
         /*and add relation in user table
         userFromBd.auth = authDataNewUser;
         await userFromBd.save();*/

         console.log('userFromBd-', userFromBd);
         authUserDataSave = await authDataNewUser.save();
         this.logger.log(`Created tokens for userId- ${userFromBd.id}`);
      }
      return authUserDataSave;

   }


}
