import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./users.service";

@Module({
    controllers: [UserController],
    imports:[
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers:[UserService],
})
export class UsersModule {}