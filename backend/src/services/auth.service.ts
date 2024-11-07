import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prismaService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequestDto, CreateUserResponseDto, LoginRequestDto, LoginResponseDto } from 'src/dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async register(data: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        try {
            const { name, email } = data
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prismaService.userEntity.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
    
            const { password, ...userWithOutPassword } = user
    
            return userWithOutPassword;
        } catch (error) {
            console.error(error)
            throw new Error('Error at create new user')
        }
    }

    async login(data: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            const { email, password } = data
            const user = await this.prismaService.userEntity.findUnique({ where: { email } })
        
            if (!user || !(await bcrypt.compare(password, user.password))) {
              throw new UnauthorizedException('Invalid credentials');
            }
        
            const payload = { sub: user.id, email: user.email, name: user.name }
            const token = this.jwtService.sign(payload);
        
            return { accessToken: token }
            
        } catch (error) {
            console.error(error)
            throw new Error('Error at login')
        }
      }

      async getAllUsers(){
        const allUsers = await this.prismaService.userEntity.findMany({ 
            select: {
                id: true,
                name: true,
                email: true,
                reservation: true
            }
         })
         return allUsers
      }

      async getUserById(id: number) {
        try{
            const user = await this.prismaService.userEntity.findUnique({ 
                where: {
                    id: id
            }, include: {
                reservation: true
            }
        })
            return user

        }catch(error){
            console.error(error)
            throw new Error('Error at get user')
        }
      }
}
