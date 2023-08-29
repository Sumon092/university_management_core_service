import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidationSchema } from './room.validation';
const router = express.Router();

router.patch(
  '/:id',
  validateRequest(RoomValidationSchema.update),
  RoomController.updateRoom
);
router.post(
  '/create-room',
  validateRequest(RoomValidationSchema.create),
  RoomController.createRoom
);

router.get('/', RoomController.getAllRoom);

router.get('/:id', RoomController.getSingleRoom);

router.delete('/:id', RoomController.deleteRoom);

export const RoomRoutes = router;
