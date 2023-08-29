import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomsFilterableFields } from './room.constants';
import { RoomService } from './room.services';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await RoomService.createRoom(data);

  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});

const getAllRoom = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomsFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await RoomService.getAllRoom(filters, options);

  sendResponse<Room[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Room fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.getSingleRoom(id);

  sendResponse<Room | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room fetched successfully',
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await RoomService.updateRoom(id, payload);

  sendResponse<Room | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successful',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await RoomService.deleteRoom(id);

  sendResponse<Room | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room delete successful',
    data: result,
  });
});

export const RoomController = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
