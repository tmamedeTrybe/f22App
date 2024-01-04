"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GastronomyController_1 = __importDefault(require("../controllers/GastronomyController"));
const gastronomy_1 = __importDefault(require("../database/models/gastronomy"));
const hd_1 = __importDefault(require("../database/models/hd"));
const GastronomyService_1 = __importDefault(require("../services/GastronomyService"));
const HdService_1 = __importDefault(require("../services/HdService"));
const gastronomyRoutes = (0, express_1.Router)();
const gastronomyController = new GastronomyController_1.default(new GastronomyService_1.default(gastronomy_1.default, new HdService_1.default(hd_1.default)));
gastronomyRoutes.get('/gastronomy', gastronomyController.getGastronomies);
gastronomyRoutes.post('/gastronomy/new', gastronomyController.createGastronomy);
gastronomyRoutes.post('/gastronomy', gastronomyController.getGastronomyBy);
gastronomyRoutes.delete('/gastronomy/detalhe/:id', gastronomyController.deleteGastronomy);
gastronomyRoutes.patch('/gastronomy/detalhe/:id/editar', gastronomyController.updateGastronomy);
exports.default = gastronomyRoutes;
