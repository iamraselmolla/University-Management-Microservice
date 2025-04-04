// src/services/roomService.ts
import { PrismaClient, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper'; // Adjust if needed
import { IGenericResponse } from '../../../interfaces/common'; // Adjust if needed

const prisma = new PrismaClient();

// Create Room
export const createRoom = async (
  data: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>
) => {
  try {
    return await prisma.room.create({ data });
  } catch (error) {
    throw new Error('Error creating room');
  }
};

// Get Room by ID
export const getRoomById = async (id: string) => {
  try {
    return await prisma.room.findUnique({ where: { id } });
  } catch (error) {
    throw new Error('Error retrieving room by ID');
  }
};

// Get all Rooms with pagination and filtering
export const getAllRooms = async (
  filters: Record<string, any>, // For dynamic filtering
  options: { page: number; limit: number }
): Promise<IGenericResponse<Room[]>> => {
  try {
    const { page, limit } = options;
    const { searchTerm, ...filterConditions } = filters;

    const andConditions = [];

    // Filter by search term
    if (searchTerm) {
      andConditions.push({
        OR: ['roomNumber', 'floor'].map(field => ({
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

    const rooms = await prisma.room.findMany({
      where: whereConditions,
      skip,
      take: limit,
      include: {
        building: true, // Include the related building details
      },
    });

    const total = await prisma.room.count({ where: whereConditions });

    return {
      data: rooms,
      meta: {
        page: Math.ceil(total / limit),
        limit,
        total,
      },
    };
  } catch (error) {
    throw new Error('Error retrieving all rooms');
  }
};

// Update Room
export const updateRoom = async (
  id: string,
  data: Partial<Omit<Room, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  try {
    return await prisma.room.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw new Error('Error updating room');
  }
};

// Delete Room
export const deleteRoom = async (id: string) => {
  try {
    return await prisma.room.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Error deleting room');
  }
};
