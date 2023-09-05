import { Router } from 'express';
import FamilyController from '../controllers/FamilyController';
import Family from '../database/models/family';
import Hd from '../database/models/hd';
import FamilyService from '../services/FamilyService';
import HdService from '../services/HdService';

const familyRoutes = Router();

const familyController = new FamilyController(new FamilyService(Family, new HdService(Hd)));

familyRoutes.get('/familia', familyController.getFamilies);
familyRoutes.post('/familia/novo', familyController.createFamily);
familyRoutes.post('/familia', familyController.getFamilyBy);
familyRoutes.delete('/familia/detalhe/:id', familyController.deleteFamily);
familyRoutes.patch('/familia/detalhe/:id/editar', familyController.updateFamily);


export default familyRoutes;