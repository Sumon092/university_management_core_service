import { Building } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

const getAllBuilding = async (): Promise<Building[]> => {
  const result = await prisma.building.findMany({
    include: {
      rooms: true,
    },
  });

  return result;
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
