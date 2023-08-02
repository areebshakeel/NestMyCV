import {  BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService:UserService){}
   async signup(email:string,password:string){
        const users= await this.userService.find(email)
        if(users.length){
            throw new BadRequestException("email already in use")
        }

        // hash the users password
        // Genarate a salt
        const salt = randomBytes(9).toString('hex')
        // Hash the salt and the passsword togetger
        const hash = (await scrypt(password,salt,32)) as Buffer
        // Join the hashed result and the salt together
        const result = salt + '.'+ hash.toString('hex');

        // create a user and save it
        const user = await this.userService.create(email,result)
        // return the user
        return user
    }

   async signin(email:string, passsword:string){

        const [user] = await this.userService.find(email)
        if (!user){
            throw new NotFoundException("user not found")
        }

        const [salt, storedHash] = user.password.split('.')
        const hash = (await scrypt(passsword,salt,32)) as Buffer;

        if (storedHash!==hash.toString('hex')){
            throw new BadRequestException("incorrect password");
        }
        return user
    }
}