import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from 'prisma/prismaService';
import { AuthMiddleware } from './middleware/verifyToken';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/user', method: RequestMethod.GET });
  }
}
