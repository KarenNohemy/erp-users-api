import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator'

//Validar que el id sea llave primario
//Validar que el username y email sean únicos


export class CreateUserDto {
    @MinLength(1)
    @IsNotEmpty()
    readonly id:number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    username:string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    readonly password:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name:string;

    @IsNotEmpty()
    @IsString()
    readonly created_at:string;

    @IsNotEmpty()
    @IsString()
    updated_at?:string;

}
