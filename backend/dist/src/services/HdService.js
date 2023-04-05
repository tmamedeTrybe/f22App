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
const wedding_1 = __importDefault(require("../database/models/wedding"));
const validateNewHd_1 = __importDefault(require("../validations/validateNewHd"));
class HdService {
    constructor(HdModel) {
        this.HdModel = HdModel;
        this.getAllHds = () => __awaiter(this, void 0, void 0, function* () {
            const hds = yield this.HdModel.findAll({ include: [
                    { model: wedding_1.default, as: 'rawWeddingsOne', attributes: ['id', 'noiva', 'noivo', 'data', 'primeiroBackupBrutoTamanho'] },
                    { model: wedding_1.default, as: 'rawWeddingsTwo', attributes: ['id', 'noiva', 'noivo', 'data', 'segundoBackupBrutoTamanho'] },
                    { model: wedding_1.default, as: 'editWeddingsOne', attributes: ['id', 'noiva', 'noivo', 'data', 'primeiroBackupTamanho'] },
                    { model: wedding_1.default, as: 'editWeddingsTwo', attributes: ['id', 'noiva', 'noivo', 'data', 'segundoBackupTamanho'] },
                ],
            });
            hds.forEach((hd) => __awaiter(this, void 0, void 0, function* () { return yield this.updateUsedGb(hd.id); }));
            return { code: 200, hds: hds.sort((a, b) => a.id - b.id) };
        });
        this.getHdBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            if (searchBy == 'Available more than') {
                const result = yield this.HdModel.findAll({
                    where: { 'available': { [sequelize_1.Op.gte]: Number(valueSearch) } },
                    include: [
                        { model: wedding_1.default, as: 'rawWeddingsOne', attributes: ['id', 'noiva', 'noivo', 'data', 'primeiroBackupBrutoTamanho'] },
                        { model: wedding_1.default, as: 'rawWeddingsTwo', attributes: ['id', 'noiva', 'noivo', 'data', 'segundoBackupBrutoTamanho'] },
                        { model: wedding_1.default, as: 'editWeddingsOne', attributes: ['id', 'noiva', 'noivo', 'data', 'primeiroBackupTamanho'] },
                        { model: wedding_1.default, as: 'editWeddingsTwo', attributes: ['id', 'noiva', 'noivo', 'data', 'segundoBackupTamanho'] },
                    ]
                });
                if (!result.length)
                    return { code: 400, erro: 'Hd não encontrado' };
                result.forEach((hd) => __awaiter(this, void 0, void 0, function* () { return yield this.updateUsedGb(hd.id); }));
                return { code: 200, hds: result.sort((a, b) => a.id - b.id) };
            }
            else {
                const result = yield this.HdModel.findAll({
                    where: { [searchBy]: { [sequelize_1.Op.substring]: valueSearch } },
                    include: [
                        { model: wedding_1.default, as: 'rawWeddingsOne', attributes: ['id', 'noiva', 'noivo', 'data', 'primeiroBackupBrutoTamanho'] },
                        { model: wedding_1.default, as: 'rawWeddingsTwo', attributes: ['id', 'noiva', 'noivo', 'data', 'segundoBackupBrutoTamanho'] },
                        { model: wedding_1.default, as: 'editWeddingsOne', attributes: ['id', 'noiva', 'noivo', 'data', 'primeiroBackupTamanho'] },
                        { model: wedding_1.default, as: 'editWeddingsTwo', attributes: ['id', 'noiva', 'noivo', 'data', 'segundoBackupTamanho'] },
                    ]
                });
                if (!result.length)
                    return { code: 400, erro: 'Hd não encontrado' };
                result.forEach((hd) => __awaiter(this, void 0, void 0, function* () { return yield this.updateUsedGb(hd.id); }));
                return { code: 200, hds: result.sort((a, b) => a.id - b.id) };
            }
        });
        this.validateHd = (id) => __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const hdexist = yield this.HdModel.findAll({ where: { id } });
                if (hdexist.length == 0)
                    return { code: 400, erro: `Hd${id} não existe` };
                return { code: 200 };
            }
            return;
        });
        this.createHd = (newHd) => __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, validateNewHd_1.default)(newHd);
            if (error)
                return { code: 400, erro: error.message };
            // const hdExist: Hd | null = await this.HdModel.findOne({ where: { name: newHd.name } });
            // if (hdExist) return { code: 400, erro: 'HD já cadastrado' }
            const created = {
                name: null,
                label: newHd.label,
                capacity: newHd.capacity,
                used: 0,
                available: newHd.capacity
            };
            const hdcreated = yield this.HdModel.create(created);
            this.HdModel.update({ name: hdcreated.id }, { where: { id: hdcreated.id } });
            return { code: 201, hd: hdcreated };
        });
        this.updateHd = (id, newInfo) => __awaiter(this, void 0, void 0, function* () {
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
        this.updateUsedGb = (id) => __awaiter(this, void 0, void 0, function* () {
            let totalSizeFirstRaw;
            let totalSizeSecondRaw;
            let totalSizeFirstEdit;
            let totalSizeSecondEdit;
            const hd = yield this.HdModel.findOne({
                where: { id },
                include: [
                    { model: wedding_1.default, as: 'rawWeddingsOne', attributes: ['primeiroBackupBrutoTamanho'] },
                    { model: wedding_1.default, as: 'rawWeddingsTwo', attributes: ['segundoBackupBrutoTamanho'] },
                    { model: wedding_1.default, as: 'editWeddingsOne', attributes: ['primeiroBackupTamanho'] },
                    { model: wedding_1.default, as: 'editWeddingsTwo', attributes: ['segundoBackupTamanho'] },
                ]
            });
            if (hd) {
                if (hd.rawWeddingsOne && hd.rawWeddingsOne.length > 0) {
                    console.log(hd.rawWeddingsOne, 'quantos bkp brutos');
                    const values = hd.rawWeddingsOne.reduce((acc, cur) => cur.primeiroBackupBrutoTamanho + acc, 0);
                    totalSizeFirstRaw = values;
                }
                else
                    totalSizeFirstRaw = 0;
                if (hd.rawWeddingsTwo && hd.rawWeddingsTwo.length > 0) {
                    const values = hd.rawWeddingsTwo.reduce((acc, cur) => cur.segundoBackupBrutoTamanho + acc, 0);
                    totalSizeSecondRaw = values;
                }
                else
                    totalSizeSecondRaw = 0;
                if (hd.editWeddingsOne && hd.editWeddingsOne.length > 0) {
                    const values = hd.editWeddingsOne.reduce((acc, cur) => cur.primeiroBackupTamanho + acc, 0);
                    totalSizeFirstEdit = values;
                }
                else
                    totalSizeFirstEdit = 0;
                if (hd.editWeddingsTwo && hd.editWeddingsTwo.length > 0) {
                    const values = hd.editWeddingsTwo.reduce((acc, cur) => cur.segundoBackupTamanho + acc, 0);
                    totalSizeSecondEdit = values;
                }
                else
                    totalSizeSecondEdit = 0;
                const result = totalSizeFirstRaw + totalSizeSecondRaw + totalSizeFirstEdit + totalSizeSecondEdit;
                console.log(result, 'resultado da soma');
                const hdUpdated = yield this.HdModel.update({
                    used: result,
                    available: hd.capacity - result
                }, {
                    where: { id }
                });
                return hdUpdated;
            }
        });
        this.deleteHd = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.HdModel.destroy({ where: { id } });
            return { code: 201, message: 'HD deletado' };
        });
    }
}
exports.default = HdService;
