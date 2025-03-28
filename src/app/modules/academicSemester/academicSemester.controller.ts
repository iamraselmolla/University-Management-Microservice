import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const semesterData = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      semesterData
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.getAllAcademicSemesters();

    sendResponse(res, {
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

    sendResponse(res, {
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

    sendResponse(res, {
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

    sendResponse(res, {
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
