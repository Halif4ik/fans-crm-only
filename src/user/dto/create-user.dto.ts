import {IsBoolean, IsEmail, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform, TransformFnParams} from "class-transformer";

export class CreateUserDto {
   @ApiProperty({example: 'John@email.ua', description: 'E-mail'})
   @IsEmail({}, {message: 'E-mail, should be string'})
   @Length(3, 255, {message: ' mail Min lenth 3 max length 255'})
   readonly email: string;

   @ApiProperty({example: '123456', description: 'Password'})
   @IsString({message: 'Password should be string'})
   @Length(4, 20, {message: 'Password Min lenth 4 max length 20'})
   readonly password: string;

   @ApiProperty({example: '<h1>John</h1>', description: 'First name'})
   @IsString({message: 'FirstName should be string'})
   @Transform(({value}: TransformFnParams) => escape(value))
   @Length(2, 255, {message: ' firstName Min lenth 2 max length 255'})
   readonly firstName: string;

   @ApiProperty({example: 'Doe', description: 'Last name'})
   @Transform(({value}) => {
      return value.toString() === 'true';
   })
   @IsBoolean({message: 'isActive should be boolean true/false'})
   @IsOptional()
   readonly isActive?: boolean;

}
