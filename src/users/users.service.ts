import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}
    create(email:string, password:string){
        const user = this.repo.create({email,password})
        
        return this.repo.save(user)
    }
    findOne(id:number){
      return  this.repo.findOne(id);
    }

    find(){

    }

    update(id:number){

    }

    remove(id:number){

    }
}
