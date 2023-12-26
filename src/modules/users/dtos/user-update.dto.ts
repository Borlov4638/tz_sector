import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"
import { SexEnum } from "../entities/user.entity"
import { Transform } from "class-transformer"

export class UserUpdateDto{
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsOptional()
    name: string

    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsOptional()
    surname: string

    @Matches(/^\S+@\S+\.\S+$/)
    @IsOptional()
    email: string

    @IsEnum(SexEnum)
    @IsOptional()
    sex: SexEnum

}