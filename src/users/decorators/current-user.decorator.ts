import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data:never, context:ExecutionContext) => {

        const request = context.switchToHttp().getRequest()
        console.log(request.session.userId)
        //returns as an argument to our route handler

        return request.currentUser

    }
)