import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let sessionId = req.cookies['sessionId'];
        if (!sessionId) {
          sessionId = v4(); // Tạo một UUID mới
          res.cookie('sessionId', sessionId, { maxAge: 900000, httpOnly: true });
        }
        next();
      }
}