import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from './entities/user.entity'
@Injectable()
export class UsersService {

  private usersListBD : User[] = [
    {
      id:1,
      username:'Karen2023',
      email:'karen@gmail.com',
      password:'karenPassword',
      first_name:'Karen',
      last_name:'López',
      created_at: new Date().getTime()
    },
    {
      id:2,
      username:'Edilzon2010',
      email:'edilzon@gmail.com',
      password:'edilzonPassword',
      first_name:'Edilzon',
      last_name:'López',
      created_at: new Date().getTime()
    },
    {
      id:3,
      username:'Fabricio2020',
      email:'fabricio@gmail.com',
      password:'fabricioPassword',
      first_name:'Fabricio',
      last_name:'López',
      created_at: new Date().getTime()
    },
  ]

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
