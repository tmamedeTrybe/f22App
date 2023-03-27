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
const validateNewHd_1 = __importDefault(require("../validations/validateNewHd"));
class HdService {
    constructor(HdModel) {
        this.HdModel = HdModel;
        this.getAllHds = () => __awaiter(this, void 0, void 0, function* () {
            const hds = yield this.HdModel.findAll({ include: [
                    { model: wedding_1.default, as: 'backupPrimeiro', attributes: ['noiva', 'noivo', 'primeiroBackupTamanho'] },
                ],
            });
            return { code: 200, hds: hds };
        });
        this.getHdBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            if (searchBy == 'Available more than') {
                // Falta Lógica para fazer a pesquisa de hds com disponibilidade acima de..
                const result = yield this.HdModel.findAll({ where: { 'available': Number(valueSearch) }, include: [{ model: wedding_1.default, as: 'rawWeddings', attributes: ['noiva', 'noivo', 'primeiroBackupTamanho'] }] });
                if (!result.length)
                    return { code: 400, erro: 'Hd não encontrado' };
                return { code: 200, hds: result };
            }
            else {
                const result = yield this.HdModel.findAll({ where: { [searchBy]: valueSearch }, include: [{ model: wedding_1.default, as: 'rawWeddings', attributes: ['noiva', 'noivo', 'primeiroBackupTamanho'] }] });
                if (!result.length)
                    return { code: 400, erro: 'Hd não encontrado' };
                return { code: 200, hds: result };
            }
        });
        this.createHd = (newHd) => __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateNewHd_1.default)(newHd);
            if (error)
                return { code: 400, erro: error.message };
            const hdExist = yield this.HdModel.findOne({ where: { name: newHd.name } });
            if (hdExist)
                return { code: 400, erro: 'HD já cadastrado' };
            const created = {
                name: newHd.name,
                label: newHd.label,
                capacity: newHd.capacity,
                used: newHd.used,
                available: newHd.capacity - newHd.used
            };
            const hdcreated = yield this.HdModel.create(created);
            return { code: 201, hd: hdcreated };
        });
        this.deleteHd = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.HdModel.destroy({ where: { id } });
            return { code: 201, message: 'HD deletado' };
        });
    }
    updateHd(id, newInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.HdModel.update({
                name: newInfo.name,
                label: newInfo.label,
                capacity: newInfo.capacity,
                used: newInfo.used
            }, {
                where: { id }
            });
            return { code: 201, message: "HD alterado" };
        });
    }
}
exports.default = HdService;
