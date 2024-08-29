import { DefaultValuePipe } from '@nestjs/common';
import { IsEmail, IsNotEmpty, isNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    @IsOptional()
    password?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name: string;

    //@IsString()
    readonly created_at: string;
    //@IsString()
    updated_at?: string;

    state:string;


}
