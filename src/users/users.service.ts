import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity'
import { randomInt } from 'crypto'; // Importa la función randomInt de Node.js para generar números aleatorios


@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }


  async create(createUserDto: CreateUserDto) {

    try {

      //Verificamos si no envian password para generar una
      if (!createUserDto.password || createUserDto.password.trim() === '') {
        createUserDto.password =  this.generateRandomPassword(createUserDto.first_name);
      }
      //Creamos el objeto del usuario con los datos necesario
      const user = this.userRepository.create(createUserDto);

      //Guardamos en BD
      await this.userRepository.save(user);
      return user;

    } catch (error) {

      this.handleDBExceptions(error);

    }

  }



  async findAll() {
    try {
      const allUsers = this.userRepository.find();
      await this.userRepository.find();
      return allUsers;

    } catch (error) {

      this.handleDBExceptions(error);

    }
  }

  async findOne(term: string, lookfor: string) {

    try {

      let userFound: UserEntity;
      const id = parseInt(term, 10);

      if (lookfor = 'id') {
        userFound = await this.userRepository.findOne({ where: { id } });
      } else {
        userFound = await this.userRepository.findOne({ where: { email: term } });
      }

      //const userFound = await this.userRespository.findOneBy( {term});  

      if (!userFound)
        throw new NotFoundException(`No se encontró el usuario con el ${lookfor} :  ${term}`);

      return userFound;

    } catch (error) {

      console.log(error)
      this.handleDBExceptions(error);

    }

  }

  async updateAll(id: number, updateUserDto: CreateUserDto) {
    try {
      // Buscar un usuario por id y cargar todas las propiedades del DTO
      const userUpdated = await this.userRepository.preload({
        id: id,
        ...updateUserDto
      });

      if (!userUpdated) {
         // Crear el usuario
        // En este método no se envia la contraseña, se debe validar en create

        const createdUser = await this.create(updateUserDto);
        return createdUser;
      } else {
        // Si se encuentra, se actualiza
        await this.userRepository.save(userUpdated);

        // Eliminar el campo de la contraseña de la respuesta
        delete userUpdated.password;
        return userUpdated;
      }

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    //preload: buscar un usuario por id y carga todas las propiedades del dto
    const userUpdated = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });

    if (!userUpdated) throw new NotFoundException(`El usuario con el id ${id} no fué encontrado`)

    await this.userRepository.save(userUpdated);

    delete userUpdated.password;

    return userUpdated;

  }

  async remove(id: string) {

    try {
      const userFound = await this.findOne(id, "id");
      await this.userRepository.remove(userFound);
      return `El usuario ${id} ha sido eliminado`

    } catch (error) {

      this.handleDBExceptions(error);

    }
  }

  //Manejo de errores de BD
  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail)

    if (error instanceof NotFoundException)
      throw error


    this.logger.error(error);
    throw new InternalServerErrorException('Internal server error, revisar logs del servidor')
  }

    // Método para generar una contraseña que combine first_name y 5 números aleatorios
    private generateRandomPassword(name: string): string {
      const randomNumbers = Array.from({ length: 5 }, () => randomInt(0, 10)).join(''); // Genera 5 números aleatorios
      return `${name}${randomNumbers}`; // Combina first_name con los números aleatorios
    }
}
