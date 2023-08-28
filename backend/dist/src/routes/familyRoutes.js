"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FamilyController_1 = __importDefault(require("../controllers/FamilyController"));
const family_1 = __importDefault(require("../database/models/family"));
// import Hd from '../database/models/hd';
const FamilyService_1 = __importDefault(require("../services/FamilyService"));
// import HdService from '../services/HdService';
const familyRoutes = (0, express_1.Router)();
// const familyController = new FamilyController(new FamilyService(Family, new HdService(Hd)));
const familyController = new FamilyController_1.default(new FamilyService_1.default(family_1.default));
familyRoutes.get('/familia', familyController.getFamilies);
familyRoutes.post('/familia', familyController.getFamilyBy);
exports.default = familyRoutes;
