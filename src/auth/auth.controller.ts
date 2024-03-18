import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginAuthDto} from "./dto/login-auth.dto";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthResponse, WrongAuthResponse} from "./dto/responce-auth.dto";

@ApiTags('Create Auth')
@Controller('/api/v1/auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {
   }

   //1.All Users can create JWT auth token
   //Endpoint: Post /api/auth/login
   @Post('/login')
   @HttpCode(200)
   @ApiOkResponse({
      status: 200,
      description: 'Auth created successfully',
      type: AuthResponse,
   })
   @ApiBadRequestResponse({
      status: 400,
      description: 'Wrong email or password',
      type: WrongAuthResponse,
   })
   @ApiOperation({summary: 'Created Auth in database for user'})
   @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
   async login(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
      return this.authService.login(loginAuthDto);
   }

}
