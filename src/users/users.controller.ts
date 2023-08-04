import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CurrentUser } from './dtos/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UserService } from './users.service';
@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private userService:UserService, private authService:AuthService){}

    // @Get('/whoami')
    // async whoAmI (@Session() session:any){
    //     return this.userService.findOne(session.userId)
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    async whoAmI (@CurrentUser() user:User){
        return user;
    }

    @Post('/signout')
    signOut(@Session() session:any){
        session.userId=null
    }

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.signup(body.email,body.password)
        session.userId = user.id
        return user
    }

    @Post('/signin')
    async signin(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.signin(body.email,body.password)
        session.userId=user.id
        return user
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
 