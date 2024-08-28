import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('/logout')
  logoutUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.logoutUser(loginUserDto);
  }

  @Post('/change-password')
  changePassword(@Body() loginUserDto: UpdateAuthDto) {
    return this.authService.changePassword(loginUserDto);
  }


}
