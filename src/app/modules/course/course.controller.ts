import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import * as courseService from './course.services';

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.createCourse(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: 'Course not found',
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: course,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { courses, total } = await courseService.getAllCourses(page, limit);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: courses,
      meta: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await courseService.deleteCourse(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
    });
  }
};
