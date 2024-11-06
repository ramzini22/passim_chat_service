import { FastifyRequest } from 'fastify';

export interface CustomRequestInterface extends FastifyRequest {
    socketId: string;
}
