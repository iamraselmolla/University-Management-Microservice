// src/controllers/roomController.ts
import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import * as roomService from './room.services';

// Create Room
export const createRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await roomService.createRoom(req.body);
  sendResponse<Room>(res, {
    statusCode: 201,
    success: true,
    message: 'Room created successfully',
    data: room,
  });
});

// Get Room by ID
export const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const room = await roomService.getRoomById(req.params.id);
  if (!room)
    return sendResponse<null>(res, {
      statusCode: 404,
      success: false,
      message: 'Room not found',
      data: null,
    });
  sendResponse<Room>(res, {
    statusCode: 200,
    success: true,
    message: 'Room retrieved successfully',
    data: room,
  });
});

// Get All Rooms
export const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, searchTerm } = req.query;
  const filters = { searchTerm };
  const options = { page: Number(page), limit: Number(limit) };
  const result = await roomService.getAllRooms(filters, options);
  sendResponse<Room[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result.data,
  });
});

// Update Room
export const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await roomService.updateRoom(req.params.id, req.body);
  sendResponse<Room>(res, {
    statusCode: 200,
    success: true,
    message: 'Room updated successfully',
    data: room,
  });
});

// Delete Room
export const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  await roomService.deleteRoom(req.params.id);
  sendResponse<null>(res, {
    statusCode: 200,
    success: true,
    message: 'Room deleted successfully',
    data: null,
  });
});
