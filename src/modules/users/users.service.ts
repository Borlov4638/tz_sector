import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRegistrationDto } from "./dtos/user-registartion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UsersPaginationDto } from "./dtos/user-pagination.dto";
import { UserUpdateDto } from "./dtos/user-update.dto";
import { createWriteStream } from "fs";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>,
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

    async updateUser(updateData: UserUpdateDto, photo: Express.Multer.File, userId : number){

        const user = await this.userRepo.findOneBy({id: userId})
        if(!user) throw new NotFoundException()

        if(photo){
            const extention = photo.mimetype.split('/')[1]
            const userPhotoName = `${user.id}.${extention}`
            const ws = createWriteStream(`user_photos/${userPhotoName}`)
            ws.write(photo.buffer)

            user.photo = userPhotoName
        }

        user.email = updateData.email ? updateData.email : user.email
        user.name = updateData.name ? updateData.email : user.name
        user.sex = updateData.sex ? updateData.sex : user.sex
        user.surname = updateData.surname ? updateData.surname : user.surname
        
        return await this.userRepo.save(user)
        
    }
}