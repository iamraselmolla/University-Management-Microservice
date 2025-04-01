import { AcademicSemester } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.entries(req.body).length === 0) {
      return sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: 'No request body found',
        data: null,
      });
    }
    const semesterData = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      semesterData
    );

    sendResponse<AcademicSemester>(res, {
      statusCode: 201,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const { page, limit, searchTerm } = req.query;
    const filters = pick(req.query, ['searchTerm', 'code', 'year']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await AcademicSemesterService.getAllAcademicSemesters(
      Number(page) || 1,
      Number(limit) || 10
    );

    sendResponse<IGenericResponse<AcademicSemester[]>>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semesters retrieved successfully',
      data: result,
    });
  }
);

const getAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getAcademicSemesterById(id);

    sendResponse<AcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester retrieved successfully',
      data: result,
    });
  }
);

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      updatedData
    );

    sendResponse<AcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    });
  }
);

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await AcademicSemesterService.deleteAcademicSemester(id);

    sendResponse<AcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester deleted successfully',
      data: null,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemester,
  deleteAcademicSemester,
};
