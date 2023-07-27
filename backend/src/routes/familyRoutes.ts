import { Router } from 'express';
import FamilyController from '../controllers/FamilyController';
import Family from '../database/models/family';
import Hd from '../database/models/hd';
import FamilyService from '../services/FamilyService';
import HdService from '../services/HdService';

const familyRoutes = Router();

const familyController = new FamilyController(new FamilyService(Family, new HdService(Hd)));

familyRoutes.get('/familia', familyController.getFamily);

export default familyRoutes;