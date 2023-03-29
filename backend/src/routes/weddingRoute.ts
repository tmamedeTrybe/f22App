import { Router } from "express";
import WeddingController from "../controllers/WeddingController";
import Hd from "../database/models/hd";
import Wedding from "../database/models/wedding";
import HdService from "../services/HdService";
import WeddingService from "../services/WeddingService";

const weddingRoutes  = Router();

const weddingController = new WeddingController(new WeddingService(Wedding, new HdService(Hd)));

weddingRoutes.get('/casamentos', weddingController.getWeddings);
weddingRoutes.post('/casamentos/novo', weddingController.createWedding);
weddingRoutes.post('/casamentos', weddingController.getWeddingBy);
weddingRoutes.patch('/casamentos/detalhe/:id/editar', weddingController.updateWedding);
weddingRoutes.delete('/casamentos/detalhe/:id/editar',weddingController.deleteWedding);


export default weddingRoutes;