import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly JWT_SECRET: string;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable not set');
    }
    this.JWT_SECRET = secret;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
  
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
  
    try {
      const decoded: any = verify(token, this.JWT_SECRET);
      req.user = { id: decoded.sub };
      next();
    } catch (error) {
      console.error('Error at decoding the token', error); 
      throw new UnauthorizedException('Invalid token');
    }
  }
  
}
