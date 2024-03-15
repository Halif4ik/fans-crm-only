import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginAuthDto {
   @ApiProperty({example: 'John@email.ua', description: 'E-mail'})
   @IsEmail({}, {message: 'E-mail, should be string'})
   @Length(3, 255, {message: ' mail Min lenth 3 max length 255'})
   readonly email: string;

   @ApiProperty({example: '123456', description: 'Password'})
   @IsString({message: 'Password should be string'})
   @Length(4, 20, {message: 'Password Min lenth 4 max length 20'})
   readonly password: string;

}
