import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
import { UserDto } from "src/users/dtos/user.dto";

interface ClassConstructor {
    new (...args:any[]):{}
}

export function Serialize (dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        
        // Run domething before the request is handled
        // by the request handler
        console.log("I'm running before the handler ",context);

        return handler.handle().pipe(
            map((data:any)=>{
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true
                })
                
            })
        )
        
    }
} 