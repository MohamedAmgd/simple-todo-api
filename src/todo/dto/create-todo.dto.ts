import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsOptional, IsString } from "class-validator"

export class CreateTodoDto {

    @ApiProperty({
        description: "The title of the TODO",
    })
    @IsString()
    title: string

    @ApiProperty({
        description: "The content of the TODO",
    })
    @IsString()
    @IsOptional()
    content: string

    @ApiProperty({
        description: "The state of the TODO (whether it is finished or not)",
        example: false
    })
    @IsBoolean()
    @IsOptional()
    is_finished: boolean
}
