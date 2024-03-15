import {HttpException, HttpStatus, Inject, Injectable, Logger} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import {Auth} from "../auth/entities/auth.entity";

@Injectable()
export class UserService {
   private readonly logger: Logger = new Logger(UserService.name);

   constructor(
       @Inject('USER_REPOSITORY')
       private userRepository: typeof User
   ) {
   }

   async createUser(createUserDto: CreateUserDto): Promise<User> {
      const userFromBd: User | null = await this.userRepository.findOne(
          {where: {email: createUserDto.email}}
      );
      if (userFromBd) throw new HttpException('User exist in bd', HttpStatus.CONFLICT);
      const hashPassword: string = await bcrypt.hash(createUserDto.password, 5);

      const creatednewUser: User = await this.userRepository.create({...createUserDto, password: hashPassword});

      this.logger.log(`Created new user- ${creatednewUser.email}`);
      return creatednewUser;
   }

   async getUserByEmailWithAuth(email: string): Promise<User | null> {
      return await this.userRepository.findOne({
         where: {email: email},
         include: [Auth],
      });
   }
}
