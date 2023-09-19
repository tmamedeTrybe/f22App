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
const family_1 = __importDefault(require("../database/models/family"));
const hd_1 = __importDefault(require("../database/models/hd"));
const FamilyService_1 = __importDefault(require("../services/FamilyService"));
const HdService_1 = __importDefault(require("../services/HdService"));
class FamilyController {
    constructor(familyService = new FamilyService_1.default(family_1.default, new HdService_1.default(hd_1.default))) {
        this.familyService = familyService;
        this.getFamilies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const families = yield this.familyService.getFamilies();
            return res.status(families.code).json(families.families);
        });
        this.getFamilyBy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const families = yield this.familyService.getFamilyBy(req.body);
            if (families.erro)
                return res.status(families.code).json({ erro: families.erro });
            return res.status(families.code).json(families.family);
        });
        this.createFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const created = yield this.familyService.createFamily(req.body);
            if (created.erro)
                return res.status(created.code).json({ erro: created.erro });
            return res.status(created.code).json({ message: 'Criado com sucesso!', family: created.family });
        });
        this.deleteFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deleted = yield this.familyService.deleteFamily(Number(id));
            return res.status(deleted.code).json({ message: deleted.message });
        });
        this.updateFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updated = yield this.familyService.updateFamily(Number(id), req.body);
            if (updated.erro)
                return res.status(updated.code).json({ message: updated.erro });
            return res.status(updated.code).json({ message: updated.message });
        });
        this.addImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const namePhoto = `../assets/images/familia/${id}.jpg`;
            const addImage = yield this.familyService.addImage(Number(id), namePhoto);
            // if (addImage.erro) return res.status(addImage.code).json({ erro: addImage.erro });
            return res.status(addImage.code).json({ message: addImage.message });
        });
    }
}
;
exports.default = FamilyController;
