// src/types/building.ts
import { Building } from '@prisma/client';

export interface BuildingResponse {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: Building | Building[] | null;
}

// src/services/buildingService.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBuilding = async (
  data: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>
) => {
  return prisma.building.create({ data });
};

export const getBuildingById = async (id: string) => {
  return prisma.building.findUnique({ where: { id } });
};

export const getAllBuildings = async () => {
  return prisma.building.findMany();
};

export const updateBuilding = async (
  id: string,
  data: Partial<Omit<Building, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  return prisma.building.update({ where: { id }, data });
};

export const deleteBuilding = async (id: string) => {
  return prisma.building.delete({ where: { id } });
};
