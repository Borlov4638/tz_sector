import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthorizationDto } from "../users/dtos/user-authorisation.dto";

@Controller()
export class AuthController{
    constructor(private readonly authService : AuthService){}

    @Post('user/login')
    async authorizeUser(@Body() data : UserAuthorizationDto){
        return await this.authService.userLogin(data)
    }

}