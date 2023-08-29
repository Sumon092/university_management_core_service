import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidationSchema } from './building.validation';
const router = express.Router();

router.post(
  '/create-building',
  validateRequest(BuildingValidationSchema.createBuilding),
  BuildingController.createBuilding
);

export const BuildingRoutes = router;
