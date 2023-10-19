import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsOptional, IsString } from "class-validator"

export class CreateTodoDto {

    @ApiProperty({
        description: "The title of the TODO",
    })
    @IsString()
    title: string
}
