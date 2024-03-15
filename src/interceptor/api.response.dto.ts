import {ApiProperty} from "@nestjs/swagger";

export class ApiResponseServ<T> {
   @ApiProperty({example: true})
   success: boolean;

   @ApiProperty({
      example: "User with this device id already exist in db",
   })
   errors_message: null | string;

   @ApiProperty({example: {id :'qwerty1'}})
   data: T | null;
}
