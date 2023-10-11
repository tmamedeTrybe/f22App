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
const CorporateService_1 = __importDefault(require("../services/CorporateService"));
const corporate_1 = __importDefault(require("../database/models/corporate"));
const HdService_1 = __importDefault(require("../services/HdService"));
const hd_1 = __importDefault(require("../database/models/hd"));
class CorporateController {
    constructor(corporateService = new CorporateService_1.default(corporate_1.default, new HdService_1.default(hd_1.default))) {
        this.corporateService = corporateService;
        this.getCorporates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const corporates = yield this.corporateService.getCorporates();
            return res.status(corporates.code).json(corporates.corporates);
        });
        this.getCorporatesBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const corporates = yield this.corporateService.getCorporatesBy(req.body);
            if (corporates.erro)
                return res.status(corporates.code).json({ erro: corporates.erro });
            return res.status(corporates.code).json(corporates.corporate);
        });
        this.deleteCorporate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield this.corporateService.deleteCorporate(Number(id));
            return res.status(deleted.code).json({ message: deleted.message });
        });
        this.createCorporate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const created = yield this.corporateService.createCorporate(req.body);
            if (created.erro)
                return res.status(created.code).json({ erro: created.erro });
            return res.status(created.code).json({ message: 'Criado com sucesso!', corporate: created.corporate });
        });
        this.updateCorporate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updated = yield this.corporateService.updateCorporate(Number(id), req.body);
            if (updated.erro)
                return res.status(updated.code).json({ message: updated.erro });
            return res.status(updated.code).json({ message: updated.message });
        });
        this.addImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const namePhoto = `../assets/images/corporativo/${id}.jpg`;
            const addImage = yield this.corporateService.addImage(Number(id), namePhoto);
            return res.status(addImage.code).json({ message: addImage.message });
        });
    }
}
;
exports.default = CorporateController;
