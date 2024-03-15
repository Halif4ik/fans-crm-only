import {ApiProperty} from '@nestjs/swagger';
import {GeneralResponse} from "../../user/interface/generalResponse.interface";
import {Auth} from "../entities/auth.entity";
import {Column} from "sequelize-typescript";

export class AuthResponse implements GeneralResponse<TAuthResponse> {
   @ApiProperty({example: true})
   success: boolean;

   @ApiProperty({example: null})
   errors_message: string | null;

   @ApiProperty({example: {
         action_token: 'eyJhbGciOiJIUzI1wiZmlyc3ROYW1lIjoiJTNDaDElM0VKb2huJTNDL2wNTY4LCJIXG-01lZrA9RKUk',
         refreshToken: 'eyJhbGciOiJIUzI6MSwiZmlyc3ROYW1lIjoiJTNDaDElM0VF0IjoxNzEwNTQwNTY4MTA1NDQxNji3etiJJMR-7B4',
         accessToken: 'eyJhbGciOiJIUzI16MSwiZmlyc3ROYW1lIjoiJTNDaDElM0VKb2hF0IjoxNzEwNTQwNTYanxBEz1ipvT2gw',
         userId: 1,
      }})
   data: TAuthResponse | null;
}

export class WrongAuthResponse implements GeneralResponse<TAuthResponse> {
   @ApiProperty({example: false})
   success: boolean;

   @ApiProperty({example: 'Wrong email or password'})
   errors_message: string | null;

   @ApiProperty({example: null})
   data: TAuthResponse | null;
}

type TAuthResponse = {
   action_token: string,
   refreshToken: string,
   accessToken: string,
};

export type TJwtBody = {
   id: number,
   email: string,
   firstName: string,
   iat?: number,
   exp?: number
}

