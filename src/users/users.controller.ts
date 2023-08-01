import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './users.service';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService:UserService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        console.log("Create user body -> ",body);
        this.userService.create(body.email, body.password)
        return "Account created"
    }

    @Get('/:id')
    async  findUser(@Param('id') id:string){        
    const user = await this.userService.findOne(parseInt(id));
    if(!user){
        throw new NotFoundException("user not found")
    } 
      return user
    }

    @Get()
    findAllUsers (@Query('email') email:string){
        return this.userService.find(email)
    }
    
    @Delete('/:id')
    deleteUser (@Param('id') id:string){
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser (@Param('id') id:string, @Body() body:UpdateUserDto){
        return this.userService.update(parseInt(id),body)
    }
} 
 