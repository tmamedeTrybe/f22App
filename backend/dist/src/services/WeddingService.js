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
// import validateNewWedding from '../validations/validateNewWedding';
const validateUpdateWedding_1 = __importDefault(require("../validations/validateUpdateWedding"));
class WeddingService {
    constructor(weddingModel, hdService) {
        this.weddingModel = weddingModel;
        this.hdService = hdService;
        this.getWeddings = () => __awaiter(this, void 0, void 0, function* () {
            const weddings = yield this.weddingModel.findAll({ include: [
                    { model: hd_1.default, as: 'editBackupOne', attributes: ['id', 'name'] },
                ],
            });
            return { code: 200, weddings };
        });
        this.getWeddingBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            const result = yield this.weddingModel.findAll({
                where: { [searchBy]: { [sequelize_1.Op.substring]: valueSearch }
                },
                include: [
                    { model: hd_1.default, as: 'editBackupOne', attributes: ['id', 'name'] },
                ],
            });
            if (!result.length)
                return { code: 400, erro: 'Evento não encontrado' };
            return { code: 200, wedding: result };
        });
    }
    createWedding(newWeddingCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { error } = validateNewWedding(newWeddingCreated);
            // if (error) return { code: 400, erro: error.message };
            const weddingExist = yield this.weddingModel.findOne({
                where: {
                    data: newWeddingCreated.data,
                    localCerimonia: newWeddingCreated.localCerimonia
                }
            });
            if (weddingExist)
                return { code: 400, erro: 'Evento já cadastrado' };
            const hdRawOneExist = yield this.hdService.validateHdNewJob(Number(newWeddingCreated.primeiroBackupBruto), Number(newWeddingCreated.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHdNewJob(Number(newWeddingCreated.segundoBackupBruto), Number(newWeddingCreated.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHdNewJob(Number(newWeddingCreated.primeiroBackup), Number(newWeddingCreated.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHdNewJob(Number(newWeddingCreated.segundoBackup), Number(newWeddingCreated.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            const weddingCreated = {
                data: newWeddingCreated.data,
                cidade: newWeddingCreated.cidade,
                noiva: newWeddingCreated.noiva,
                noivo: newWeddingCreated.noivo,
                imagem: newWeddingCreated.imagem,
                localCerimonia: newWeddingCreated.localCerimonia,
                localRecepcao: newWeddingCreated.localRecepcao,
                primeiroBackupBruto: newWeddingCreated.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newWeddingCreated.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newWeddingCreated.segundoBackupBruto,
                segundoBackupBrutoTamanho: newWeddingCreated.segundoBackupBrutoTamanho,
                primeiroBackup: newWeddingCreated.primeiroBackup,
                primeiroBackupTamanho: newWeddingCreated.primeiroBackupTamanho,
                segundoBackup: newWeddingCreated.segundoBackup,
                segundoBackupTamanho: newWeddingCreated.segundoBackupTamanho
            };
            const created = yield this.weddingModel.create(weddingCreated);
            yield this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(created.segundoBackup));
            return { code: 201, wedding: created };
        });
    }
    ;
    updateWedding(id, newInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateUpdateWedding_1.default)(newInfo);
            if (error)
                return { code: 400, erro: error.message };
            const wedding = yield this.weddingModel.findOne({ where: { id } });
            const hdRawOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackupBruto), Number(wedding.primeiroBackupBrutoTamanho), Number(newInfo.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackupBruto), Number(wedding.segundoBackupBrutoTamanho), Number(newInfo.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackup), Number(wedding.primeiroBackupTamanho), Number(newInfo.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackup), Number(wedding.segundoBackupTamanho), Number(newInfo.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            yield this.weddingModel.update({
                data: newInfo.data,
                cidade: newInfo.cidade,
                noiva: newInfo.noiva,
                noivo: newInfo.noivo,
                imagem: newInfo.imagem,
                localCerimonia: newInfo.localCerimonia,
                localRecepcao: newInfo.localRecepcao,
                primeiroBackupBruto: newInfo.primeiroBackupBruto === 0 ? null : newInfo.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newInfo.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newInfo.segundoBackupBruto === 0 ? null : newInfo.segundoBackupBruto,
                segundoBackupBrutoTamanho: newInfo.segundoBackupBrutoTamanho,
                primeiroBackup: newInfo.primeiroBackup === 0 ? null : newInfo.primeiroBackup,
                primeiroBackupTamanho: newInfo.primeiroBackupTamanho,
                segundoBackup: newInfo.segundoBackup === 0 ? null : newInfo.segundoBackup,
                segundoBackupTamanho: newInfo.segundoBackupTamanho
            }, { where: { id } });
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.segundoBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackup));
            return { code: 201, message: "Casamento alterado" };
        });
    }
    deleteWedding(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const wedding = yield this.weddingModel.findOne({ where: { id } });
            yield this.weddingModel.destroy({ where: { id } });
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(wedding === null || wedding === void 0 ? void 0 : wedding.segundoBackup));
            return { code: 201, message: "Casamento deletado" };
        });
    }
    ;
    addImage(id, namePhoto) {
        return __awaiter(this, void 0, void 0, function* () {
            const wedding = yield this.weddingModel.findOne({ where: { id } });
            if (!wedding)
                return { code: 400, erro: 'Erro ao incluir imagem!' };
            yield this.weddingModel.update({
                imagem: namePhoto,
            }, { where: { id } });
            return { code: 201, message: 'Imagem atualizada' };
        });
    }
}
;
exports.default = WeddingService;
