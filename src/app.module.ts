import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'tz_database',
      autoLoadEntities:true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    JwtModule.register({
      global:true,
      secret: 'super_secret_key_that_shoud_be_in_dotenv)'
  }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
