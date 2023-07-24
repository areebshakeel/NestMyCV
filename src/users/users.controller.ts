import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
@Controller('auth')
export class UsersController {
    constructor(private userService:UserService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        console.log("Create user body -> ",body);
        this.userService.create(body.email, body.password)
        return "Account created"
    }
}
 