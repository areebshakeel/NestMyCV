import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers:[UserService,AuthService,{ provide:APP_INTERCEPTOR, useClass: CurrentUserInterceptor}]
})
export class UsersModule {} 
