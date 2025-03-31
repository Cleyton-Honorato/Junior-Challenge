import prisma from "../models/prisma";

export class RingService {
  static async countRingsByBearer(bearer: number) {
    const count = await prisma.ring.count({
      where: { bearer },
    });
    return count;
  }

  static async createRing(data: {
    name: string;
    power: string;
    bearer: number;
    forged: string;
  }) {
    return await prisma.ring.create({ data });
  }

  static async getAllRings() {
    return await prisma.ring.findMany();
  }

  static async getRingById(id: number) {
    return await prisma.ring.findUnique({ where: { id } });
  }

  static async updateRing(
    id: number,
    data: Partial<{
      name: string;
      power: string;
      bearer: number;
      forged: string;
    }>
  ) {
    return await prisma.ring.update({ where: { id }, data });
  }

  static async deleteRing(id: number) {
    return await prisma.ring.delete({ where: { id } });
  }
}
