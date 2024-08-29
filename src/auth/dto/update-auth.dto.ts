import {  IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './login-user.dto';

export class UpdateAuthDto extends PartialType(LoginUserDto) {

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    new_password?: string;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(8)
    // @MaxLength(100)
    // old_password?: string;

}