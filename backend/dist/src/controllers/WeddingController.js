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
const hd_1 = __importDefault(require("../database/models/hd"));
const wedding_1 = __importDefault(require("../database/models/wedding"));
const HdService_1 = __importDefault(require("../services/HdService"));
const WeddingService_1 = __importDefault(require("../services/WeddingService"));
class WeddingController {
    constructor(weddingService = new WeddingService_1.default(wedding_1.default, new HdService_1.default(hd_1.default))) {
        this.weddingService = weddingService;
        this.getWeddings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const weddings = yield this.weddingService.getWeddings();
            return res.status(weddings.code).json(weddings.weddings);
        });
        this.getWeddingBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const wedding = yield this.weddingService.getWeddingBy(req.body);
            if (wedding.erro)
                return res.status(wedding.code).json({ erro: wedding.erro });
            return res.status(wedding.code).json(wedding.wedding);
        });
        this.createWedding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const created = yield this.weddingService.createWedding(req.body);
            if (created.erro)
                return res.status(created.code).json({ erro: created.erro });
            return res.status(created.code).json({ message: 'Criado com sucesso!', wedding: created.wedding });
        });
        this.updateWedding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const update = yield this.weddingService.updateWedding(Number(id), req.body);
            return res.status(update.code).json({ message: update.message });
        });
        this.deleteWedding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield this.weddingService.deleteWedding(Number(id));
            res.status(deleted.code).json({ message: deleted.message });
        });
    }
}
exports.default = WeddingController;
