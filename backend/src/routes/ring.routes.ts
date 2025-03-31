import { FastifyInstance } from 'fastify';
import { RingController } from '../controllers/ring.controller';

export async function ringRoutes(fastify: FastifyInstance) {
  fastify.post('/rings', RingController.create);
  fastify.get('/rings', RingController.getAll);
  fastify.put('/rings/:id', RingController.update);
  fastify.get('/rings/:id', RingController.getById);
  fastify.delete('/rings/:id', RingController.delete);
}