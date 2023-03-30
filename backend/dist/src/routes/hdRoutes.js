"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HdController_1 = __importDefault(require("../controllers/HdController"));
const hd_1 = __importDefault(require("../database/models/hd"));
const HdService_1 = __importDefault(require("../services/HdService"));
const hdRoutes = (0, express_1.Router)();
const hdController = new HdController_1.default(new HdService_1.default(hd_1.default));
hdRoutes.get('/hds', hdController.getAllHds);
hdRoutes.post('/hds', hdController.getHdBy);
hdRoutes.post('/hds/new', hdController.createHd);
hdRoutes.patch('/hds/details/:id/update', hdController.updateHd);
hdRoutes.delete('/hds/details/:id', hdController.deleteHd);
// hdRoutes.get('/hds/details/:id/weddings', hdController.updateUsed)
exports.default = hdRoutes;
