import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidationSchema } from './building.validation';
const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BuildingValidationSchema.update),
  BuildingController.updateBuilding
);
router.post(
  '/create-building',
  validateRequest(BuildingValidationSchema.create),
  BuildingController.createBuilding
);

router.get('/', BuildingController.getAllBuilding);

router.get('/:id', BuildingController.getSingleBuilding);

router.delete('/:id', BuildingController.deleteBuilding);

export const BuildingRoutes = router;
