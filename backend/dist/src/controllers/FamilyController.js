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
        this.getFamily = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const family = yield this.familyService.getFamilies();
            return res.status(family.code).json(family.family);
        });
    }
}
;
exports.default = FamilyController;
