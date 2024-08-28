import { ConsoleLogger, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


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
  
    if (!user) {
      throw new UnauthorizedException('Usuario incorrecto. ¡Intenta nuevamente!');
    }

    if (password != user.password) {
      throw new UnauthorizedException('Contraseña incorrecta. ¡Intenta nuevamente!');
    }
  
    delete user.password;
  
    return user;
  }

  logoutUser(authUserDto: LoginUserDto) {
    return `Cerró sesion exitosamente`;
  }

  changePassword(createAuthDto: UpdateAuthDto) {
    return `Se actualizo la contraseña exitosamente`;
  }

}
