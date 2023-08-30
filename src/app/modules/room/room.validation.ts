import { z } from 'zod';

const create = z.object({
  body: z.object({
    room_number: z.string({
      required_error: 'Room Number is required',
    }),
    floor: z.string({
      required_error: 'Floor is required',
    }),
    buildingId: z.string({
      required_error: 'Building is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    room_number: z.string().optional(),
    floor: z.string().optional(),
    buildingId: z.string().optional(),
  }),
});

export const RoomValidationSchema = {
  create,
  update,
};
