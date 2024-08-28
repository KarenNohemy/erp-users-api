import { ConsoleLogger, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly loginRepository: Repository<UserEntity>,
  ) { }


  async loginUser(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    // Obtén el usuario de la base de datos
    const user = await this.loginRepository.findOne({
      where: { username },
      select: { username: true, password: true },
    });

    this.validateUser(user, user.password, password)
   
    //Cambiar state a Activo 
    await this.loginRepository.update({ username }, { state: 'Activo' });

    delete user.password;

    return user;
  }

  async logoutUser(logoutUserDto: LoginUserDto) {

    const { username } = logoutUserDto;

    //Cambiar state a Inactivo 
    await this.loginRepository.update({ username }, { state: 'Inactivo' });

    return `Cerró sesion exitosamente`;
  }

  async changePassword(changePasswordDto: UpdateAuthDto) {
    const { username, password, newPassword } = changePasswordDto;

    // Obtén el usuario de la base de datos
    const user = await this.loginRepository.findOne({
      where: { username },
      select: { username: true, password: true },
    });


    this.validateUser(user, user.password, password)

    if (user.password === password)
      throw new UnauthorizedException('La contraseña es igual a la anterior. ¡Intenta con otra!');

    //Cambiar password por newPassword - filtro where por username
    await this.loginRepository.update({ username }, { password: newPassword });

    return `Se actualizo la contraseña exitosamente`;
  }

  validateUser(user, passwordBD: string, passwordBody: string) {

    if (!user) 
      throw new UnauthorizedException('Usuario incorrecto. ¡Intenta nuevamente!');
    

    if (passwordBD != passwordBody) 
      throw new UnauthorizedException('Contraseña incorrecta. ¡Intenta nuevamente!');



    
  }

}
