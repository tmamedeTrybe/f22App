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
Object.defineProperty(exports, "__esModule", { value: true });
class WeddingService {
    constructor(weddingModel) {
        this.weddingModel = weddingModel;
        this.getWeddings = () => __awaiter(this, void 0, void 0, function* () {
            const weddings = yield this.weddingModel.findAll();
            return { code: 200, weddings };
        });
        this.getWeddingBy = (search) => __awaiter(this, void 0, void 0, function* () {
            const { searchBy, valueSearch } = search;
            // if (searchBy == 'data') {
            //     const validDate = validateSearchByDate(valueSearch);
            //     if (validDate.erro) return { code: 400, erro: validDate.erro };
            // }
            // console.log(searchBy);
            const result = yield this.weddingModel.findAll({ where: { [searchBy]: valueSearch } });
            if (!result.length)
                return { code: 400, erro: 'Evento não encontrado' };
            return { code: 200, wedding: result };
        });
    }
}
exports.default = WeddingService;
