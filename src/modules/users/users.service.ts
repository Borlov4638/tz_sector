import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRegistrationDto } from "./dtos/user-registartion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UsersPaginationDto } from "./dtos/user-pagination.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>
    ){}
    
    async userRegister(userData: UserRegistrationDto){
        const user = new UserEntity()
        user.name = userData.name
        user.email = userData.email
        user.password = await bcrypt.hash(userData.password, 10)
        await this.userRepo.save(user)
        return user
    }

    async findUserById(userId : number){
        const user = await this.userRepo.findOneBy({id:userId})
        if(!user) throw new NotFoundException('User not found')

        return user
    }

    async getAllUsers(pagination : UsersPaginationDto){
        const sortDirection = pagination.sortDirection === 'asc' ? 'ASC' : 'DESC';
        const pageNumber = pagination.page ? +pagination.page : 1;
        const pageSize = pagination.pageSize ? +pagination.pageSize : 10;
        const itemsToSkip = (pageNumber - 1) * pageSize;
    
        const users = await this.userRepo
            .createQueryBuilder('u')
            .select('u.*')
            .orderBy('registrationDate', sortDirection)
            .limit(pageSize)
            .offset(itemsToSkip)
            .getRawMany();
      
        const totalCountOfItems = await this.userRepo
            .createQueryBuilder("u")
            .select("u.*")
            .getCount()
    
        const mappedResponse = {
            pagesCount: Math.ceil(totalCountOfItems / pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCountOfItems,
            items: [...users],
        };
        return mappedResponse;
  
    }
}