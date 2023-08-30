import { Building, Prisma } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  buildingRelationalFields,
  buildingRelationalFieldsMapper,
  buildingSearchableFields,
} from './building.constants';
import { IBuildingFilterRequest } from './building.interface';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllBuilding = async (
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => {
      if (buildingRelationalFields.includes(key)) {
        return {
          [buildingRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.building.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: 'desc' },
    include: {
      rooms: true,
    },
  });
  const total = await prisma.building.count({
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

const getSingleBuilding = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.findUnique({
    where: {
      id,
    },
    include: {
      rooms: true,
    },
  });
  return result;
};

const updateBuilding = async (
  id: string,
  payload: Partial<Building>
): Promise<Building | null> => {
  const result = await prisma.building.update({
    where: {
      id,
    },
    data: payload,
    include: {
      rooms: true,
    },
  });
  return result;
};

const deleteBuilding = async (id: string): Promise<Building | null> => {
  const result = await prisma.building.delete({
    where: {
      id,
    },
  });
  return result;
};
export const BuildingService = {
  createBuilding,
  getAllBuilding,
  getSingleBuilding,
  updateBuilding,
  deleteBuilding,
};
