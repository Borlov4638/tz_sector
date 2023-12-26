import { Transform } from "class-transformer"
import { IsNotEmpty, IsString, Matches } from "class-validator"

export class UserRegistrationDto{
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    name: string
    @Matches(/^\S+@\S+\.\S+$/)
    email: string
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    password: string
}