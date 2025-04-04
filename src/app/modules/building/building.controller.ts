// src/controllers/buildingController.ts
import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import * as buildingService from './building.services';

// Create Building
export const createBuilding = catchAsync(
  async (req: Request, res: Response) => {
    const building = await buildingService.createBuilding(req.body);
    sendResponse<Building>(res, {
      statusCode: 201,
      success: true,
      message: 'Building created successfully',
      data: building,
    });
  }
);

// Get Building by ID
export const getBuildingById = catchAsync(
  async (req: Request, res: Response) => {
    const building = await buildingService.getBuildingById(req.params.id);
    if (!building)
      return sendResponse<null>(res, {
        statusCode: 404,
        success: false,
        message: 'Building not found',
        data: null,
      });
    sendResponse<Building>(res, {
      statusCode: 200,
      success: true,
      message: 'Building retrieved successfully',
      data: building,
    });
  }
);

// Get All Buildings
export const getAllBuildings = catchAsync(
  async (req: Request, res: Response) => {
    const { page, limit, searchTerm } = req.query;
    const filters = { searchTerm };
    const options = { page: Number(page), limit: Number(limit) };
    const result = await buildingService.getAllBuildings(filters, options);
    sendResponse<Building[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Buildings retrieved successfully',
      data: result.data,
    });
  }
);

// Update Building
export const updateBuilding = catchAsync(
  async (req: Request, res: Response) => {
    const building = await buildingService.updateBuilding(
      req.params.id,
      req.body
    );
    sendResponse<Building>(res, {
      statusCode: 200,
      success: true,
      message: 'Building updated successfully',
      data: building,
    });
  }
);

// Delete Building
export const deleteBuilding = catchAsync(
  async (req: Request, res: Response) => {
    await buildingService.deleteBuilding(req.params.id);
    sendResponse<null>(res, {
      statusCode: 200,
      success: true,
      message: 'Building deleted successfully',
      data: null,
    });
  }
);
