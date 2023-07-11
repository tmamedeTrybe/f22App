import { Router } from "express";
import WeddingController from "../controllers/WeddingController";
import Hd from "../database/models/hd";
import Wedding from "../database/models/wedding";
import HdService from "../services/HdService";
import WeddingService from "../services/WeddingService";
import uploads from "../middlewares/uploads";

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
//     cb(null, './images')
//   },
//   filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
//     cb(null, file.originalname)
//   },
// })

// const upload = multer({ storage: storage });

const weddingRoutes = Router();

const weddingController = new WeddingController(new WeddingService(Wedding, new HdService(Hd)));

weddingRoutes.get('/casamentos', weddingController.getWeddings);
weddingRoutes.post('/casamentos/novo', weddingController.createWedding);
weddingRoutes.post('/casamentos', weddingController.getWeddingBy);
weddingRoutes.patch('/casamentos/detalhe/:id/editar', weddingController.updateWedding);
weddingRoutes.delete('/casamentos/detalhe/:id/editar',weddingController.deleteWedding);
weddingRoutes.post('/casamentos/imagem/:id', uploads.single('file'), weddingController.addImage);

export default weddingRoutes;