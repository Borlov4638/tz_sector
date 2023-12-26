import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFileOptions, ParseFilePipe, ParseIntPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserRegistrationDto } from "./dtos/user-registartion.dto";
import { UsersPaginationDto } from "./dtos/user-pagination.dto";
import { UserUpdateDto } from "./dtos/user-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";

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

    @UseInterceptors(FileInterceptor("file", {}))
    @Put('user/:id')
    updateUser(
        @Param('id', ParseIntPipe) userId : number,
        @Body() data : UserUpdateDto,
        @UploadedFile(new ParseFilePipe({ fileIsRequired: false, validators: [new MaxFileSizeValidator({ maxSize: 1e7 }), new FileTypeValidator({ fileType: /^image\/+/ })] } as ParseFileOptions))
        file : Express.Multer.File
    ){
        return this.userService.updateUser(data, file, userId)
    }

}
