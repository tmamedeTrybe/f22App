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
const sequelize_1 = require("sequelize");
// import HdService from '../services/HdService';
const hd_1 = __importDefault(require("../database/models/hd"));
class FamilyService {
    // constructor(private familyModel: typeof Family, private hdService: HdService ) {}
    constructor(familyModel) {
        this.familyModel = familyModel;
        this.getFamilies = () => __awaiter(this, void 0, void 0, function* () {
            const families = yield this.familyModel.findAll({ include: [
                    { model: hd_1.default, as: 'rawBackupOne', attributes: ['id', 'name', 'used'] },
                ],
            });
            return { code: 200, families };
        });
        this.getFamilyBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            const result = yield this.familyModel.findAll({
                where: { [searchBy]: { [sequelize_1.Op.substring]: valueSearch }
                },
                include: [{ model: hd_1.default, as: 'rawBackupOne', attributes: ['id', 'name'] }],
            });
            if (!result.length)
                return { code: 400, erro: 'Evento não encontrado' };
            return { code: 200, family: result };
        });
    }
}
;
exports.default = FamilyService;
