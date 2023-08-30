import { Prisma, Room } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  roomRelationalFields,
  roomRelationalFieldsMapper,
  roomsSearchableFields,
} from './room.constants';
import { IRoomsFilterRequest } from './room.interface';

const createRoom = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};

export const getAllRoom = async (
  filters: IRoomsFilterRequest, 
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let sortConditions: Record<string, string> = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: roomsSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => {
      if (roomRelationalFields.includes(key)) {
        return {
          [roomRelationalFieldsMapper[key]]: {
            id: (filterData as any)[key],
          },
        };
      } else {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }
    });
    andConditions.push({
      AND: filterConditions,
    });
  }

  const whereConditions: Prisma.RoomWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.room.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      building: true,
    },
  });

  const total = await prisma.room.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleRoom = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });
  return result;
};

const updateRoom = async (
  id: string,
  payload: Partial<Room>
): Promise<Room | null> => {
  const result = await prisma.room.update({
    where: {
      id,
    },
    data: payload,
    include: {
      building: true,
    },
  });
  return result;
};

const deleteRoom = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });
  return result;
};
export const RoomService = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
