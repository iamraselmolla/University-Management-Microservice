import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import * as buildingService from './building.services';

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

export const getAllBuildings = catchAsync(
  async (_req: Request, res: Response) => {
    const buildings = await buildingService.getAllBuildings();
    sendResponse<Building[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Buildings retrieved successfully',
      data: buildings,
    });
  }
);

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
