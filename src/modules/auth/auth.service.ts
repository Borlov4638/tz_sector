import { JwtService } from "@nestjs/jwt";
import { UserAuthorizationDto } from "../users/dtos/user-authorisation.dto";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { Repository } from "typeorm";

export class AuthService{
    constructor(
        private jwtService : JwtService,
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>
    ){}

    async userLogin(userData : UserAuthorizationDto){
        const user = await this.userRepo.findOneBy({email: userData.email})
        console.log(user)

        
        if(!user){
            throw new UnauthorizedException()
        }

        const isUserValid = await bcrypt.compare(userData.password, user.password)
        console.log(isUserValid)
        if(!isUserValid){
            throw new UnauthorizedException()
        }

        return await this.jwtService.signAsync({email: user.email, id: user.id}, {expiresIn: "1h"})
    }
}