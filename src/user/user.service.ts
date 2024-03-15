import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: typeof User
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

}
