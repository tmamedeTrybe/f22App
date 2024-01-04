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
const hd_1 = __importDefault(require("../database/models/hd"));
const validateUpdateGastronomy_1 = __importDefault(require("../validations/validateUpdateGastronomy"));
class GastronomyService {
    constructor(gastronomyModel, hdService) {
        this.gastronomyModel = gastronomyModel;
        this.hdService = hdService;
        this.getGastronomies = () => __awaiter(this, void 0, void 0, function* () {
            const gastronomies = yield this.gastronomyModel.findAll({ include: [
                    { model: hd_1.default, as: 'editBackupOne', attributes: ['id', 'name'] },
                ]
            });
            return { code: 200, gastronomies };
        });
        this.getGastronomyBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            const result = yield this.gastronomyModel.findAll({
                where: { [searchBy]: { [sequelize_1.Op.substring]: valueSearch } },
                include: [
                    { model: hd_1.default, as: 'editBackupOne', attributes: ['id', 'name'] },
                ],
            });
            if (!result.length)
                return { code: 400, erro: 'Evento não encontrado' };
            return { code: 200, gastronomy: result };
        });
        this.createGastronomy = (newGastronomy) => __awaiter(this, void 0, void 0, function* () {
            const gastronomyExist = yield this.gastronomyModel.findOne({
                where: {
                    data: newGastronomy.data,
                    empresa: newGastronomy.empresa
                }
            });
            if (gastronomyExist)
                return { code: 400, erro: 'Evento já cadastrado' };
            const hdRawOneExist = yield this.hdService.validateHdNewJob(Number(newGastronomy.primeiroBackupBruto), Number(newGastronomy.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHdNewJob(Number(newGastronomy.segundoBackupBruto), Number(newGastronomy.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHdNewJob(Number(newGastronomy.primeiroBackup), Number(newGastronomy.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHdNewJob(Number(newGastronomy.segundoBackup), Number(newGastronomy.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            const gastronomyCreated = {
                date: newGastronomy.data,
                company: newGastronomy.empresa,
                event: newGastronomy.evento,
                contact: newGastronomy.contato,
                venue: newGastronomy.local,
                city: newGastronomy.cidade,
                image: newGastronomy.imagem,
                primeiroBackupBruto: newGastronomy.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newGastronomy.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newGastronomy.segundoBackupBruto,
                segundoBackupBrutoTamanho: newGastronomy.segundoBackupBrutoTamanho,
                primeiroBackup: newGastronomy.primeiroBackup,
                primeiroBackupTamanho: newGastronomy.primeiroBackupTamanho,
                segundoBackup: newGastronomy.segundoBackup,
                segundoBackupTamanho: newGastronomy.segundoBackupTamanho
            };
            const created = yield this.gastronomyModel.create(gastronomyCreated);
            yield this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(created.segundoBackup));
            return { code: 201, gastronomy: created };
        });
        this.deleteGastronomy = (id) => __awaiter(this, void 0, void 0, function* () {
            const gastronomy = yield this.gastronomyModel.findOne({ where: { id } });
            yield this.gastronomyModel.destroy({ where: { id } });
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.segundoBackup));
            return { code: 201, message: "Evento deletado" };
        });
        this.updateGastronomy = (id, newInfo) => __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateUpdateGastronomy_1.default)(newInfo);
            if (error)
                return { code: 400, erro: error.message };
            const gastronomy = yield this.gastronomyModel.findOne({ where: { id } });
            const hdRawOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackupBruto), Number(gastronomy.primeiroBackupBrutoTamanho), Number(newInfo.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdEditOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackup), Number(gastronomy.primeiroBackupTamanho), Number(newInfo.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackup), Number(gastronomy.segundoBackupTamanho), Number(newInfo.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            yield this.gastronomyModel.update({
                date: newInfo.data,
                company: newInfo.empresa,
                event: newInfo.evento,
                contact: newInfo.contato,
                venue: newInfo.local,
                city: newInfo.cidade,
                primeiroBackupBruto: newInfo.primeiroBackupBruto === 0 ? null : newInfo.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newInfo.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newInfo.segundoBackupBruto === 0 ? null : newInfo.segundoBackupBruto,
                segundoBackupBrutoTamanho: newInfo.segundoBackupBrutoTamanho,
                primeiroBackup: newInfo.primeiroBackup === 0 ? null : newInfo.primeiroBackup,
                primeiroBackupTamanho: newInfo.primeiroBackup,
                segundoBackup: newInfo.segundoBackup === 0 ? null : newInfo.segundoBackup,
                segundoBackupTamanho: newInfo.segundoBackupTamanho
            }, { where: { id } });
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(gastronomy === null || gastronomy === void 0 ? void 0 : gastronomy.segundoBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackup));
            return { code: 201, message: "Evento alterado" };
        });
    }
}
;
exports.default = GastronomyService;
