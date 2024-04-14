import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToInstance} from "class-transformer";


export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements  NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {



        //run something before request is handled by request handler
        console.log('I am running before the handler', context)

        return next.handle().pipe(
            map((data) => {
                //run something before the response is sent out
                console.log('I am running  before the response is sent out', data)

                return plainToInstance(this.dto, data, {

                    //returns oly values with the Expose()
                    excludeExtraneousValues:true
                })
            })
        )
    }
}