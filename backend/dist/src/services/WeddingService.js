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
const hd_1 = __importDefault(require("../database/models/hd"));
const validateNewWedding_1 = __importDefault(require("../validations/validateNewWedding"));
class WeddingService {
    constructor(weddingModel) {
        this.weddingModel = weddingModel;
        this.getWeddings = () => __awaiter(this, void 0, void 0, function* () {
            const weddings = yield this.weddingModel.findAll({ include: [
                    { model: hd_1.default, as: 'rawBackupOne', attributes: ['id', 'name'] },
                ],
            });
            return { code: 200, weddings };
        });
        this.getWeddingBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            const result = yield this.weddingModel.findAll({ where: { [searchBy]: valueSearch },
            });
            if (!result.length)
                return { code: 400, erro: 'Evento não encontrado' };
            return { code: 200, wedding: result };
        });
    }
    createWedding(newWeddingCreated) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateNewWedding_1.default)(newWeddingCreated);
            if (error)
                return { code: 400, erro: error.message };
            const weddingExist = yield this.weddingModel.findOne({ where: { data: newWeddingCreated.data, localCerimonia: newWeddingCreated.localCerimonia } });
            if (weddingExist)
                return { code: 400, erro: 'Evento já cadastrado' };
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
            return { code: 201, wedding: created };
        });
    }
    updateWedding(id, newInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.weddingModel.update({
                data: newInfo.data,
                cidade: newInfo.cidade,
                noiva: newInfo.noiva,
                noivo: newInfo.noivo,
                imagem: newInfo.imagem,
                localCerimonia: newInfo.localCerimonia,
                localRecepcao: newInfo.localRecepcao,
                primeiroBackupBruto: newInfo.primeiroBackupBruto,
                primeiroBackupBrutoTamanho: newInfo.primeiroBackupBrutoTamanho,
                segundoBackupBruto: newInfo.segundoBackupBruto,
                segundoBackupBrutoTamanho: newInfo.segundoBackupBrutoTamanho,
                primeiroBackup: newInfo.primeiroBackup,
                primeiroBackupTamanho: newInfo.primeiroBackupTamanho,
                segundoBackup: newInfo.segundoBackup,
                segundoBackupTamanho: newInfo.segundoBackupTamanho
            }, { where: { id } });
            return { code: 201, message: "Casamento alterado" };
        });
    }
    deleteWedding(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.weddingModel.destroy({ where: { id } });
            return { code: 201, message: "Casamento deletado" };
        });
    }
}
exports.default = WeddingService;
