import { Router } from "express";
import WeddingController from "../controllers/WeddingController";
import Wedding from "../database/models/wedding";
import WeddingService from "../services/WeddingService";

const weddingRoutes  = Router();

const weddingController = new WeddingController(new WeddingService(Wedding));

// weddingRoutes.get('/casamentos', weddingController.getWeddings);
weddingRoutes.post('/casamentos', weddingController.getWeddingBy);

export default weddingRoutes;