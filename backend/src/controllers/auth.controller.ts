import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { CreateUserRequestDto, CreateUserResponseDto, LoginRequestDto } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() data: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        return this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: LoginRequestDto): Promise<string> {
        const{ accessToken } = await this.authService.login(data);
        return accessToken
    }

    @Get()
    async getAllUsers(){
        const users = await this.authService.getAllUsers()
        return users
    }

    @Get('user')
    async getUserById(@Req() req: Request){

        const { id } = req.user
        const user = await this.authService.getUserById(id)
        return user
    }
}
