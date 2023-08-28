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
// import Hd from "../database/models/hd";
const FamilyService_1 = __importDefault(require("../services/FamilyService"));
// import HdService from "../services/HdService";
class FamilyController {
    // constructor(private familyService = new FamilyService(Family, new HdService(Hd))) {}
    constructor(familyService = new FamilyService_1.default(family_1.default)) {
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
    }
}
;
exports.default = FamilyController;
