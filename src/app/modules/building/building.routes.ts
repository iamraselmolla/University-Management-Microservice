// src/routes/buildingRoutes.ts
import { Router } from 'express';
import * as BuildingController from './building.controller';

const router = Router();

router.post('/', BuildingController.createBuilding);
router.get('/', BuildingController.getAllBuildings);
router.get('/:id', BuildingController.getBuildingById);
router.put('/:id', BuildingController.updateBuilding);
router.delete('/:id', BuildingController.deleteBuilding);

export const BuildingRouter = router;
