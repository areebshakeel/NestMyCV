import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor (private userService:UserService){}

    async intercept(context:ExecutionContext, handler:CallHandler){
        const request = context.switchToHttp().getRequest()
        const {userId} = request

        if (userId){
            const user = await this.userService.findOne(userId)
            request.currentUser= user
        }
        
        return handler.handle();
    }
}