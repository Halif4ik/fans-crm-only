import {
   Controller,
   Get,
   Post,
   Body,
   Patch,
   Param,
   Delete,
   HttpCode,
   ValidationPipe,
   UsePipes,
   UseGuards
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserExistResponseClass, UserResponseClass} from "./dto/responce-user.dto";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@ApiTags('CRUD User')
@Controller('/api/user')
export class UserController {
   constructor(private readonly userService: UserService) {
   }

   //1.All Users can create new account
   //Endpoint: Post /api/user/create
   @Post('create')
   @HttpCode(200)
   @ApiOkResponse({
      status: 200,
      description: 'User created successfully',
      type: UserResponseClass,
   })
   @ApiBadRequestResponse({
      status: 400,
      description: 'User already exist in db',
      type: UserExistResponseClass,
   })
   @ApiOperation({summary: 'Created User in database'})
   @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
   async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      const user: User = await this.userService.createUser(createUserDto)
      return user.id;
   }

   //2.Get Userinfo  by id
   //Endpoint: Get /api/user/:id
   /*   @Get(':id')
      @UseGuards(AuthGuard(['jwt-auth']))*/


}
