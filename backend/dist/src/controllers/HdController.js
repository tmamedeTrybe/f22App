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
const HdService_1 = __importDefault(require("../services/HdService"));
class HdController {
    constructor(hdService = new HdService_1.default(hd_1.default)) {
        this.hdService = hdService;
        this.getAllHds = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hds = yield this.hdService.getAllHds();
            return res.status(hds.code).json(hds.hds);
        });
        this.getHdBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hds = yield this.hdService.getHdBy(req.body);
            if (hds.erro)
                return res.status(hds.code).json({ erro: hds.erro });
            return res.status(hds.code).json(hds.hds);
        });
        this.createHd = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const createdHd = yield this.hdService.createHd(req.body);
            if (createdHd.erro)
                return res.status(createdHd.code).json({ erro: createdHd.erro });
            return res.status(createdHd.code).json({ message: 'Criado com sucesso!', hd: createdHd.hd });
        });
        this.updateHd = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id, 'id do params');
            console.log(req.body, 'Body chegando');
            const update = yield this.hdService.updateHd(Number(id), req.body);
            return res.status(update.code).json({ message: update.message });
        });
        this.deleteHd = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield this.hdService.deleteHd(Number(id));
            return res.status(deleted.code).json({ message: deleted.message });
        });
    }
}
;
exports.default = HdController;
