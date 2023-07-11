"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WeddingController_1 = __importDefault(require("../controllers/WeddingController"));
const hd_1 = __importDefault(require("../database/models/hd"));
const wedding_1 = __importDefault(require("../database/models/wedding"));
const HdService_1 = __importDefault(require("../services/HdService"));
const WeddingService_1 = __importDefault(require("../services/WeddingService"));
const uploads_1 = __importDefault(require("../middlewares/uploads"));
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
const weddingRoutes = (0, express_1.Router)();
const weddingController = new WeddingController_1.default(new WeddingService_1.default(wedding_1.default, new HdService_1.default(hd_1.default)));
weddingRoutes.get('/casamentos', weddingController.getWeddings);
weddingRoutes.post('/casamentos/novo', weddingController.createWedding);
weddingRoutes.post('/casamentos', weddingController.getWeddingBy);
weddingRoutes.patch('/casamentos/detalhe/:id/editar', weddingController.updateWedding);
weddingRoutes.delete('/casamentos/detalhe/:id/editar', weddingController.deleteWedding);
weddingRoutes.post('/casamentos/imagem/:id', uploads_1.default.single('file'), weddingController.addImage);
exports.default = weddingRoutes;
