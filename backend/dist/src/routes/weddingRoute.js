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
const weddingRoutes = (0, express_1.Router)();
const weddingController = new WeddingController_1.default(new WeddingService_1.default(wedding_1.default, new HdService_1.default(hd_1.default)));
weddingRoutes.get('/casamentos', weddingController.getWeddings);
weddingRoutes.post('/casamentos/novo', weddingController.createWedding);
weddingRoutes.post('/casamentos', weddingController.getWeddingBy);
weddingRoutes.patch('/casamentos/detalhe/:id/editar', weddingController.updateWedding);
weddingRoutes.delete('/casamentos/detalhe/:id/editar', weddingController.deleteWedding);
exports.default = weddingRoutes;
