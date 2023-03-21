import { Router } from 'express';
import HdController from '../controllers/HdController';
import Hd from '../database/models/hd';
import HdService from '../services/HdService';

const hdRoutes = Router();

const hdController = new HdController(new HdService(Hd));

hdRoutes.get('/hds', hdController.getAllHds);
hdRoutes.post('/hds', hdController.getHdBy);
hdRoutes.post('/hds/new', hdController.createHd);

export default hdRoutes;