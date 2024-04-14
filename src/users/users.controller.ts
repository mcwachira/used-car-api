import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Serialize, SerializeInterceptor} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dto/user.dto";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Post('/signup')

        createUser(@Body() body : CreateUserDto){

        const {email, password} = body
   return this.usersService.create(email, password)
        }


        @Get()
        findAllUsers(@Query('email') email:string){
        return this.usersService.find(email)
        }

//@UseInterceptors(new SerializeInterceptor(UserDto))

        @Get('/:id')
   async  findUser(@Param('id') id:string){

        console.log('handler is running')
       const user =  await this.usersService.findOne(parseInt(id))


            if(!user){
                throw new NotFoundException('user not found ')
            }

            return user
        }


        @Patch('/:id')
        updateUser(@Param('id') id:string, @Body() body : UpdateUserDto) {

        // const {email, password} = body
        return this.usersService.update(parseInt(id), body)



        }

        @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id))
        }

}
