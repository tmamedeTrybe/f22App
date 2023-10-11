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
const validateUpdateCorporate_1 = __importDefault(require("../validations/validateUpdateCorporate"));
class CorporateService {
    constructor(corporateModel, hdService) {
        this.corporateModel = corporateModel;
        this.hdService = hdService;
        this.getCorporates = () => __awaiter(this, void 0, void 0, function* () {
            // Falta incluir a chave corresponde do HD no rawBackupOne
            const corporates = yield this.corporateModel.findAll({ include: [
                    { model: hd_1.default, as: 'editBackupOne', attributes: ['id', 'name'] },
                ],
            });
            return { code: 200, corporates };
        });
        this.getCorporatesBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            const result = yield this.corporateModel.findAll({
                where: { [searchBy]: { [sequelize_1.Op.substring]: valueSearch }
                },
                include: [
                    { model: hd_1.default, as: 'editBackupOne', attributes: ['id', 'name'] },
                ],
            });
            if (!result.length)
                return { code: 400, erro: 'Evento não encontrado' };
            return { code: 200, corporate: result };
        });
        this.deleteCorporate = (id) => __awaiter(this, void 0, void 0, function* () {
            const corporate = yield this.corporateModel.findOne({ where: { id } });
            yield this.corporateModel.destroy({ where: { id } });
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.segundoBackup));
            return { code: 201, message: "Evento deletado" };
        });
        this.createCorporate = (newCorporateCreate) => __awaiter(this, void 0, void 0, function* () {
            const corporateExist = yield this.corporateModel.findOne({
                where: {
                    data: newCorporateCreate.data,
                    local: newCorporateCreate.local
                }
            });
            if (corporateExist)
                return { code: 400, erro: 'Evento já cadastrado' };
            const hdRawOneExist = yield this.hdService.validateHdNewJob(Number(newCorporateCreate.primeiroBackupBruto), Number(newCorporateCreate.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHdNewJob(Number(newCorporateCreate.segundoBackupBruto), Number(newCorporateCreate.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHdNewJob(Number(newCorporateCreate.primeiroBackup), Number(newCorporateCreate.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHdNewJob(Number(newCorporateCreate.segundoBackup), Number(newCorporateCreate.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            const corporateCreated = {
                data: newCorporateCreate.data,
                empresa: newCorporateCreate.empresa,
                evento: newCorporateCreate.evento,
                contratante: newCorporateCreate.contratante,
                local: newCorporateCreate.local,
                cidade: newCorporateCreate.cidade,
                imagem: newCorporateCreate.imagem,
                primeiroBackupBruto: newCorporateCreate.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newCorporateCreate.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newCorporateCreate.segundoBackupBruto,
                segundoBackupBrutoTamanho: newCorporateCreate.segundoBackupBrutoTamanho,
                primeiroBackup: newCorporateCreate.primeiroBackup,
                primeiroBackupTamanho: newCorporateCreate.primeiroBackupTamanho,
                segundoBackup: newCorporateCreate.segundoBackup,
                segundoBackupTamanho: newCorporateCreate.segundoBackupTamanho
            };
            const created = yield this.corporateModel.create(corporateCreated);
            yield this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(created.segundoBackup));
            return { code: 201, corporate: created };
        });
        this.updateCorporate = (id, newInfo) => __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateUpdateCorporate_1.default)(newInfo);
            if (error)
                return { code: 400, erro: error.message };
            const corporate = yield this.corporateModel.findOne({ where: { id } });
            const hdRawOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackupBruto), Number(corporate.primeiroBackupBrutoTamanho), Number(newInfo.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackupBruto), Number(corporate.segundoBackupBrutoTamanho), Number(newInfo.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackup), Number(corporate.primeiroBackupTamanho), Number(newInfo.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackup), Number(corporate.segundoBackupTamanho), Number(newInfo.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            yield this.corporateModel.update({
                data: newInfo.data,
                empresa: newInfo.empresa,
                evento: newInfo.evento,
                contratante: newInfo.contratante,
                local: newInfo.local,
                cidade: newInfo.cidade,
                primeiroBackupBruto: newInfo.primeiroBackupBruto === 0 ? null : newInfo.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newInfo.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newInfo.segundoBackupBruto === 0 ? null : newInfo.segundoBackupBruto,
                segundoBackupBrutoTamanho: newInfo.segundoBackupBrutoTamanho,
                primeiroBackup: newInfo.primeiroBackup === 0 ? null : newInfo.primeiroBackup,
                primeiroBackupTamanho: newInfo.primeiroBackupTamanho,
                segundoBackup: newInfo.segundoBackup === 0 ? null : newInfo.segundoBackup,
                segundoBackupTamanho: newInfo.segundoBackupTamanho
            }, { where: { id } });
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(corporate === null || corporate === void 0 ? void 0 : corporate.segundoBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackup));
            return { code: 201, message: "Evento alterado" };
        });
    }
    addImage(id, namePhoto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.corporateModel.update({
                imagem: namePhoto,
            }, {
                where: { id },
            });
            return { code: 201, message: 'Imagem atualizada' };
        });
    }
    ;
}
;
exports.default = CorporateService;
