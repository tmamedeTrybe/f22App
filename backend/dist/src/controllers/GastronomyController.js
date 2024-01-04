"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GastronomyService_1 = __importDefault(require("../services/GastronomyService"));
const gastronomy_1 = __importDefault(require("../database/models/gastronomy"));
const HdService_1 = __importDefault(require("../services/HdService"));
const hd_1 = __importDefault(require("../database/models/hd"));
class GastronomyController {
    constructor(gastronomyService = new GastronomyService_1.default(gastronomy_1.default, new HdService_1.default(hd_1.default))) {
        this.gastronomyService = gastronomyService;
        this.getGastronomies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gastronomies = yield this.gastronomyService.getGastronomies();
            return res.status(gastronomies.code).json(gastronomies.gastronomies);
        });
        this.getGastronomyBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gastronomies = yield this.gastronomyService.getGastronomyBy(req.body);
            if (gastronomies.erro)
                return res.status(gastronomies.code).json({ erro: gastronomies.erro });
            return res.status(gastronomies.code).json(gastronomies.gastronomy);
        });
        this.createGastronomy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const created = yield this.gastronomyService.createGastronomy(req.body);
            if (created.erro)
                return res.status(created.code).json({ erro: created.erro });
            return res.status(created.code).json({ message: 'Criado com sucesso' });
        });
        this.deleteGastronomy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield this.gastronomyService.deleteGastronomy(Number(id));
            return res.status(deleted.code).json({ message: deleted.message });
        });
        this.updateGastronomy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updated = yield this.gastronomyService.updateGastronomy(Number(id), req.body);
            if (updated.erro)
                return res.status(updated.code).json({ message: updated.erro });
            res.status(updated.code).json({ message: updated.message });
        });
    }
}
;
exports.default = GastronomyController;
