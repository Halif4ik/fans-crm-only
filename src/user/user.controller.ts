import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Param
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ResponseUserInfo,
  UserExistResponseClass,
  UserResponseClass
} from "./dto/responce-user.dto";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { UserDec } from "../auth/decor-pass-user";
import { GeneralResponse } from "./interface/generalResponse.interface";

@ApiTags("CRUD User")
@Controller("/api/v1")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  //1.All Users can create new account
  //Endpoint: Post /api/user/add-user
  @Post("add-user")
  @HttpCode(200)
  @ApiOkResponse({
    status: 200,
    description: "User created successfully",
    type: UserResponseClass
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "User already exist in db",
    type: UserExistResponseClass
  })
  @ApiOperation({ summary: "Created User in database" })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userService.createUser(createUserDto);
    return user.id;
  }

  //2.Get Userinfo  by id
  //Endpoint: Get /api/get-user/:id
  @Get("get-user/:id")
  @ApiOkResponse({
    status: 200,
    description: "User info",
    type: ResponseUserInfo
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Incorrect user id",
    type: ResponseUserInfo
  })
  @ApiOperation({ summary: "Get User info by id" })
  @UseGuards(AuthGuard(["jwt-auth"]))
  async findUserById(@UserDec() userFromGuard: User, @Param("id") id: number): Promise<User> {
    return this.userService.findUserById(userFromGuard, id);
  }
}
