import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class CreateUserResponseDto {

    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsEmail()
    email: string
}


export class LoginRequestDto {
    
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class LoginResponseDto {
    accessToken: string;
}