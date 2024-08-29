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
   
    //Cambiar state a Conectado 
    await this.loginRepository.update({ username }, { state: process.env.STATE_USER_ON });

    delete user.password;

    return user;
  }

  async logoutUser(logoutUserDto: LoginUserDto) {

    const { username } = logoutUserDto;

    //Cambiar state a Desconectado 
    await this.loginRepository.update({ username }, { state: process.env.STATE_USER_OF });

    return process.env.MSG_LOGOUT;
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
      throw new UnauthorizedException(process.env.MSG_ERROR_PASSWORD);

    //Cambiar password por newPassword - filtro where por username
    await this.loginRepository.update({ username }, { password: newPassword });

    return process.env.MSG_UPDATE_PASSWORD;
  }

  validateUser(user, passwordBD: string, passwordBody: string) {

    if (!user) 
      throw new UnauthorizedException(process.env.MSG_ERROR_USER);
    

    if (passwordBD != passwordBody) 
      throw new UnauthorizedException(process.env.MSG_ERROR_PASSWORD);



    
  }

}
