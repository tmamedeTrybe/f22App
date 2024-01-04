import { Router } from 'express';
import GastronomyController from '../controllers/GastronomyController';
import Gastronomy from '../database/models/gastronomy';
import Hd from '../database/models/hd';
import GastronomyService from '../services/GastronomyService';
import HdService from '../services/HdService';

const gastronomyRoutes = Router();

const gastronomyController = new GastronomyController(new GastronomyService(Gastronomy, new HdService(Hd)));

gastronomyRoutes.get('/gastronomy', gastronomyController.getGastronomies);
gastronomyRoutes.post('/gastronomy/new', gastronomyController.createGastronomy);
gastronomyRoutes.post('/gastronomy', gastronomyController.getGastronomyBy);
gastronomyRoutes.delete('/gastronomy/detalhe/:id', gastronomyController.deleteGastronomy);
gastronomyRoutes.patch('/gastronomy/detalhe/:id/editar', gastronomyController.updateGastronomy);

export default gastronomyRoutes;