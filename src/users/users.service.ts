import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {UserEntity} from './entities/user.entity'
import { isNull } from 'util';


@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService'); 

  constructor (
    @InjectRepository(UserEntity)
    private readonly userRespository: Repository<UserEntity>
  ){}

  private usersListBD : UserEntity[] = [
    {
      id:1,
      username:'Karen2023',
      email:'karen@gmail.com',
      password:'karenPassword',
      first_name:'Karen',
      last_name:'López',
      created_at: new Date().toISOString()
    }
  ]

  async create(createUserDto: CreateUserDto) {

    try {
      const user = this.userRespository.create(createUserDto); 
      await this.userRespository.save(user); 
      return user;

    } catch (error) {
      
      this.handleDBExceptions(error); 

    }

  }



  async findAll() {
    try {
      const allUsers = this.userRespository.find(); 
      await this.userRespository.find(); 
      return allUsers;

    } catch (error) {
      
      this.handleDBExceptions(error); 

    }
  }

  async findOne(id: number) {

    try {
      const userFound = await this.userRespository.findOneBy( { id } );  
      //await this.userRespository.findOne({ where: { id } }); 
      if(!userFound)
        throw new NotFoundException(`No se encontró el usuario con el id ${id}`);

      return userFound;

    } catch (error) {

      console.log(error)
      this.handleDBExceptions(error); 

    }

    

  }

  updateElement(id: number, updateUserDto: CreateUserDto) {
    let userBD: UserEntity;

    //Validar si el id es numerico
    console.log("ID: " + id)
    if(isNaN(id))throw new  BadRequestException(`El formato para el id no es correcto`);
  
    try {
      // Intentar encontrar el usuario
     // userBD = this.findOne(id);
    } catch (error) {
      // Si no se encuentra el usuario, se captura la excepción aquí
      // y se procede a crear uno nuevo
      userBD = undefined;
    }
  
    if (userBD) {
      // Si el usuario fue encontrado, se actualiza
      userBD = {
        ...userBD,
        ...updateUserDto,
        updated_at: new Date().toISOString()
      };
  
      this.usersListBD = this.usersListBD.map(user => 
        user.id === id ? userBD : user
      );
  
      return `El usuario ${userBD.first_name} ha sido actualizado`;
    } else {
      // Si el usuario no fue encontrado, se crea uno nuevo
      const userUpdated: CreateUserDto = {
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: updateUserDto.password,
        first_name: updateUserDto.first_name,
        last_name: updateUserDto.last_name,
        created_at: new Date().toISOString()
        };
     
     //   this.usersListBD.push(userUpdated);
  
      return `El usuario ${userUpdated.first_name} ha sido creado`;
    }
  }
  

  update(id: number, updateUserDto: UpdateUserDto) {

    //Validar si el id es numerico


    let userBD = this.findOne(id)

   /** 
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

    */
  }

  async remove(id: string) {

    try {
      const userFound = await this.findOne(+id); 
      await this.userRespository.remove(userFound);
      return `El usuario ${id} ha sido eliminado`

    } catch (error) {
      
      this.handleDBExceptions(error); 

    }
  }

  //Manejo de errores de BD
  private handleDBExceptions (error: any){
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    if(error instanceof NotFoundException)
      throw error


    this.logger.error(error); 
    throw new InternalServerErrorException('Internal server error, revisar logs del servidor')
  }
}
