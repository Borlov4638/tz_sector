import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFileOptions, ParseFilePipe, ParseIntPipe, Post, Put, Query, UploadedFile } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserRegistrationDto } from "./dtos/user-registartion.dto";
import { UsersPaginationDto } from "./dtos/user-pagination.dto";

@Controller()

export class UserController{
    constructor(private readonly userService : UserService){}

    @Get("profile")
    getAllUsers(
        @Query() paginationQuery : UsersPaginationDto
    ){
        return this.userService.getAllUsers(paginationQuery)
    }

    @Get('profile/:id')
    async getUserById(@Param('id', ParseIntPipe) userId : number){
        return await this.userService.findUserById(userId)
    }

    @Post('user/register')
    registerUser(@Body() data : UserRegistrationDto){
        return this.userService.userRegister(data)
    }

    @Put()
    updateUser(
        @UploadedFile(new ParseFilePipe({ fileIsRequired: true, validators: [new MaxFileSizeValidator({ maxSize: 1e7 }), new FileTypeValidator({ fileType: /^image\/+/ })] } as ParseFileOptions))
        file : Express.Multer.File
    ){
        
    }

}
