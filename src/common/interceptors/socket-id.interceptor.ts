import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomRequestInterface } from '../types/custom-request.interface';

@Injectable()
export class SocketIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<CustomRequestInterface>();
        const socketId = request.headers['websocket-key'] as string | undefined;

        if (socketId) request.socketId = socketId;

        return next.handle();
    }
}
