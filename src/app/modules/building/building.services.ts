// src/services/buildingService.ts
import { Building, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper'; // Adjust if needed
import { IGenericResponse } from '../../../interfaces/common'; // Adjust if needed

const prisma = new PrismaClient();

// Create Building
export const createBuilding = async (
  data: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>
) => {
  try {
    return await prisma.building.create({ data });
  } catch (error) {
    throw new Error('Error creating building');
  }
};

// Get Building by ID
export const getBuildingById = async (id: string) => {
  try {
    return await prisma.building.findUnique({ where: { id } });
  } catch (error) {
    throw new Error('Error retrieving building by ID');
  }
};

// Get all Buildings with pagination and filtering
export const getAllBuildings = async (
  filters: Record<string, any>, // For dynamic filtering
  options: { page: number; limit: number }
): Promise<IGenericResponse<Building[]>> => {
  try {
    const { page, limit } = options;
    const { searchTerm, ...filterConditions } = filters;

    const andConditions = [];

    // Filter by search term
    if (searchTerm) {
      andConditions.push({
        OR: ['title', 'address'].map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }

    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};

    const { skip } = paginationHelpers.calculatePagination(options);

    const buildings = await prisma.building.findMany({
      where: whereConditions,
      skip,
      take: limit,
    });

    const total = await prisma.building.count({ where: whereConditions });

    return {
      data: buildings,
      meta: {
        page: Math.ceil(total / limit),
        limit,
        total,
      },
    };
  } catch (error) {
    throw new Error('Error retrieving all buildings');
  }
};

// Update Building
export const updateBuilding = async (
  id: string,
  data: Partial<Omit<Building, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  try {
    return await prisma.building.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error('Error updating building');
  }
};

// Delete Building
export const deleteBuilding = async (id: string) => {
  try {
    return await prisma.building.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Error deleting building');
  }
};
