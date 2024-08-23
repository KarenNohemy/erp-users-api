import { BadRequestException, Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
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
      created_at: new Date().toISOString()
    },
    {
      id:2,
      username:'Edilzon2010',
      email:'edilzon@gmail.com',
      password:'edilzonPassword',
      first_name:'Edilzon',
      last_name:'López',
      created_at: new Date().toISOString()
    },
    {
      id:3,
      username:'Fabricio2020',
      email:'fabricio@gmail.com',
      password:'fabricioPassword',
      first_name:'Fabricio',
      last_name:'López',
      created_at: new Date().toISOString()
    },
  ]

  create(createUserDto: CreateUserDto) {

    const user: User = {
      id: createUserDto.id,
      username:createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      created_at: new Date().toISOString(),
      updated_at: createUserDto.updated_at ?? new Date().toISOString(),
    }

    //Validar error al hacer insert en bd 
    this.usersListBD.push(user); 

    return user;
  }

  findAll() {
    return this.usersListBD;
  }

  findOne(id: number) {

    const userFound = this.usersListBD.find(usuario => usuario.id === id); 
    
    if(!userFound) throw new NotFoundException(`No se encontró el usuario con el id: ${id}`);

    return userFound;
  }

  

  update(id: number, updateUserDto: UpdateUserDto) {

    let userBD = this.findOne(id)
   
    this.usersListBD = this.usersListBD.map(user => {
      if(user.id === id){
        userBD.updated_at = new Date().toISOString(),
        userBD = {
          ...userBD,
          ...updateUserDto}
          return userBD;
        }

        return user; 
      }); 


    return `El usuario  ${userBD.first_name} ha sido actualizado`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
