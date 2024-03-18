import { ApiProperty } from "@nestjs/swagger";
import { GeneralResponse } from "../interface/generalResponse.interface";
import { User } from "../entities/user.entity";


export class UserResponseClass implements GeneralResponse<{ "id": number }> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: null })
  errors_message: string | null;

  @ApiProperty({ example: { id: "1" } })
  data: { "id": number } | null;
}

export class UserExistResponseClass implements GeneralResponse<{ "id": number }> {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: "User with this device id already exist in db" })
  errors_message: string | null;

  @ApiProperty({ example: null })
  data: { "id": number } | null;
}

export class ResponseUserInfo implements GeneralResponse<User> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: null })
  errors_message: string | null;

  @ApiProperty({ example: { id: "1" } })
  data: User | null;
}
