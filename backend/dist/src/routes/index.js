"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gastronomyRoutes = exports.corporateRoutes = exports.familyRoutes = exports.hdRoutes = exports.weddingRoutes = exports.userRoutes = void 0;
const userRoutes_1 = __importDefault(require("./userRoutes"));
exports.userRoutes = userRoutes_1.default;
const weddingRoute_1 = __importDefault(require("./weddingRoute"));
exports.weddingRoutes = weddingRoute_1.default;
const hdRoutes_1 = __importDefault(require("./hdRoutes"));
exports.hdRoutes = hdRoutes_1.default;
const familyRoutes_1 = __importDefault(require("./familyRoutes"));
exports.familyRoutes = familyRoutes_1.default;
const corporateRoutes_1 = __importDefault(require("./corporateRoutes"));
exports.corporateRoutes = corporateRoutes_1.default;
const gastronomyRoutes_1 = __importDefault(require("./gastronomyRoutes"));
exports.gastronomyRoutes = gastronomyRoutes_1.default;
