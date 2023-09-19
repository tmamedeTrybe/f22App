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
const validateUpdateFamily_1 = __importDefault(require("../validations/validateUpdateFamily"));
class FamilyService {
    constructor(familyModel, hdService) {
        this.familyModel = familyModel;
        this.hdService = hdService;
        // constructor(private familyModel: typeof Family ) {}
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
        this.createFamily = (newFamilyCreated) => __awaiter(this, void 0, void 0, function* () {
            const familyExist = yield this.familyModel.findOne({
                where: {
                    data: newFamilyCreated.data,
                    local: newFamilyCreated.local
                }
            });
            if (familyExist)
                return { code: 400, erro: 'Evento já cadastrado' };
            const hdRawOneExist = yield this.hdService.validateHdNewJob(Number(newFamilyCreated.primeiroBackupBruto), Number(newFamilyCreated.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHdNewJob(Number(newFamilyCreated.segundoBackupBruto), Number(newFamilyCreated.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHdNewJob(Number(newFamilyCreated.primeiroBackup), Number(newFamilyCreated.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHdNewJob(Number(newFamilyCreated.segundoBackup), Number(newFamilyCreated.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            const familyCreated = {
                data: newFamilyCreated.data,
                categoria: newFamilyCreated.categoria,
                nome: newFamilyCreated.nome,
                contratante: newFamilyCreated.contratante,
                imagem: newFamilyCreated.imagem,
                local: newFamilyCreated.local,
                primeiroBackupBruto: newFamilyCreated.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newFamilyCreated.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newFamilyCreated.segundoBackupBruto,
                segundoBackupBrutoTamanho: newFamilyCreated.segundoBackupBrutoTamanho,
                primeiroBackup: newFamilyCreated.primeiroBackup,
                primeiroBackupTamanho: newFamilyCreated.primeiroBackupTamanho,
                segundoBackup: newFamilyCreated.segundoBackup,
                segundoBackupTamanho: newFamilyCreated.segundoBackupTamanho
            };
            const created = yield this.familyModel.create(familyCreated);
            yield this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(created.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(created.segundoBackup));
            return { code: 201, family: created };
        });
        this.deleteFamily = (id) => __awaiter(this, void 0, void 0, function* () {
            const family = yield this.familyModel.findOne({ where: { id } });
            yield this.familyModel.destroy({ where: { id } });
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.segundoBackup));
            return { code: 201, message: "Evento deletado" };
        });
        this.updateFamily = (id, newInfo) => __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateUpdateFamily_1.default)(newInfo);
            if (error)
                return { code: 400, erro: error.message };
            const family = yield this.familyModel.findOne({ where: { id } });
            const hdRawOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackupBruto), Number(family.primeiroBackupBrutoTamanho), Number(newInfo.primeiroBackupBrutoTamanho));
            if (hdRawOneExist === null || hdRawOneExist === void 0 ? void 0 : hdRawOneExist.erro)
                return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };
            const hdRawTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackupBruto), Number(family.segundoBackupBrutoTamanho), Number(newInfo.segundoBackupBrutoTamanho));
            if (hdRawTwoExist === null || hdRawTwoExist === void 0 ? void 0 : hdRawTwoExist.erro)
                return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };
            const hdEditOneExist = yield this.hdService.validateHd(Number(newInfo.primeiroBackup), Number(family.primeiroBackupTamanho), Number(newInfo.primeiroBackupTamanho));
            if (hdEditOneExist === null || hdEditOneExist === void 0 ? void 0 : hdEditOneExist.erro)
                return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };
            const hdEditTwoExist = yield this.hdService.validateHd(Number(newInfo.segundoBackup), Number(family.segundoBackupTamanho), Number(newInfo.segundoBackupTamanho));
            if (hdEditTwoExist === null || hdEditTwoExist === void 0 ? void 0 : hdEditTwoExist.erro)
                return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };
            yield this.familyModel.update({
                data: newInfo.data,
                categoria: newInfo.categoria,
                nome: newInfo.nome,
                contratante: newInfo.contratante,
                local: newInfo.local,
                primeiroBackupBruto: newInfo.primeiroBackupBruto === 0 ? null : newInfo.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newInfo.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newInfo.segundoBackupBruto === 0 ? null : newInfo.segundoBackupBruto,
                segundoBackupBrutoTamanho: newInfo.segundoBackupBrutoTamanho,
                primeiroBackup: newInfo.primeiroBackup === 0 ? null : newInfo.primeiroBackup,
                primeiroBackupTamanho: newInfo.primeiroBackupTamanho,
                segundoBackup: newInfo.segundoBackup === 0 ? null : newInfo.segundoBackup,
                segundoBackupTamanho: newInfo.segundoBackupTamanho
            }, { where: { id } });
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(family === null || family === void 0 ? void 0 : family.segundoBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
            yield this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
            yield this.hdService.updateUsedGb(Number(newInfo.segundoBackup));
            return { code: 201, message: "Evento alterado" };
        });
    }
    addImage(id, namePhoto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.familyModel.update({
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
exports.default = FamilyService;
