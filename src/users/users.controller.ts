import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('auth')
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

        @Get('/:id')
    findUser(@Param('id') id:string){
       const user =  this.usersService.findOne(parseInt(id))


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
