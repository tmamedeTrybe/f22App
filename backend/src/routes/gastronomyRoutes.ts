import { Router } from 'express';
import GastronomyController from '../controllers/GastronomyController';
import Gastronomy from '../database/models/gastronomy';
import GastronomyService from '../services/GastronomyService';

const gastronomyRoutes = Router();

const gastronomyController = new GastronomyController(new GastronomyService(Gastronomy));

gastronomyRoutes.get('/gastronomy', gastronomyController.getGastronomies);
gastronomyRoutes.post('gastronomy', gastronomyController.getGastronomyBy);

export default gastronomyRoutes;