import {  IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {

    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    @IsOptional()
    password?: string;



}
