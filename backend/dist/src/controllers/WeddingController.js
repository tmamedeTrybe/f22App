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
const wedding_1 = __importDefault(require("../database/models/wedding"));
const WeddingService_1 = __importDefault(require("../services/WeddingService"));
class WeddingController {
    constructor(weddingService = new WeddingService_1.default(wedding_1.default)) {
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
    }
}
exports.default = WeddingController;
