import { Building } from '@prisma/client';
import prisma from '../../../constants/prisma';

const createBuilding = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};
export const BuildingService = {
  createBuilding,
};
