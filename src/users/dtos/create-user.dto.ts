import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        example: "username"
    })
    @IsString()
    username: string

    @ApiProperty({
        example: "12345678"
    })
    @IsString()
    password: string
}
