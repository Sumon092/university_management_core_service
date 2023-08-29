import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BuildingService } from './building.services';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BuildingService.createBuilding(data);

  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building created successfully',
    data: result,
  });
});

const getAllBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getAllBuilding();

  sendResponse<Building[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Building fetched successfully',
    data: result,
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildingService.getSingleBuilding(id);

  sendResponse<Building | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building fetched successfully',
    data: result,
  });
});

const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BuildingService.updateBuilding(id, payload);

  sendResponse<Building | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building updated successful',
    data: result,
  });
});

const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BuildingService.deleteBuilding(id);

  sendResponse<Building | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building delete successful',
    data: result,
  });
});

export const BuildingController = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  updateBuilding,
  deleteBuilding,
};
