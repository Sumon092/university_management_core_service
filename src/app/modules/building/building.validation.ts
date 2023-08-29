import { z } from 'zod';

const createBuilding = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const BuildingValidationSchema = {
  createBuilding,
};
