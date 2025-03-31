import { FastifyReply, FastifyRequest } from "fastify";
import { RingService } from "../services/ring.service";

enum EBearer {
  elves = 1,
  dwarves = 2,
  men = 3,
  saurs = 4,
}

const EBearerDict: Record<EBearer, string> = {
  [EBearer.elves]: 'Elfos',
  [EBearer.dwarves]: 'Anões',
  [EBearer.men]: 'Homens',
  [EBearer.saurs]: 'Sauros',
};

const limits = {
  [EBearer.elves]: 3,
  [EBearer.dwarves]: 7,
  [EBearer.men]: 9,
  [EBearer.saurs]: 1,
};

export class RingController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, power, bearer, forged } = req.body as {
        name: string;
        power: string;
        bearer: EBearer;
        forged: string;
      };

      if (!(bearer in limits)) {
        return reply.status(400).send({ error: "Tipo de portador inválido" });
      }

      const count = await RingService.countRingsByBearer(bearer);

      if (count >= limits[bearer]) {
        return reply.status(400).send({
          error: `Limite de anéis excedido para o portador ${EBearerDict[bearer]}. Máximo de ${limits[bearer]} anéis permitidos.`,
        });
      }

      const newRing = await RingService.createRing({
        name,
        power,
        bearer,
        forged,
      });

      return reply.status(201).send(newRing);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ error: "Erro ao criar o anel" });
    }
  }

  static async getAll(req: FastifyRequest, reply: FastifyReply) {
    const rings = await RingService.getAllRings();
    reply.send(rings);
  }

  static async getById(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    const ring = await RingService.getRingById(Number(id));
    if (ring) reply.send(ring);
    else reply.status(404).send({ error: "Anel não encontrado" });
  }

  static async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const updatedRing = await RingService.updateRing(
      Number(id),
      req.body as any
    );
    reply.send(updatedRing);
  }

  static async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    await RingService.deleteRing(Number(id));
    reply.status(204).send();
  }
}
