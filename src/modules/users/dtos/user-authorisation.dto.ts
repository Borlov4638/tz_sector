import { IsNotEmpty, IsString } from "class-validator";

export class UserAuthorizationDto{
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password:string
}