import { Op } from "sequelize";
import Hd from "../database/models/hd";
import Wedding from "../database/models/wedding";
import newWedding from "../interfaces/newWedding";
import searchWeddingbyDate from "../interfaces/searchWedding";
import weddingUpdate from "../interfaces/weddingUpdate";
import validateNewWedding from "../validations/validateNewWedding";
import HdService from "./HdService";

class WeddingService {
    constructor(private weddingModel: typeof Wedding, private hdService: HdService) {}

    public getWeddings = async () => {
        const weddings = await this.weddingModel.findAll({ include:
            [
                { model: Hd, as: 'rawBackupOne', attributes: ['id','name'] },
            ],
        });
        return {code: 200, weddings}
    }

    public getWeddingBy = async (search: searchWeddingbyDate) => {
        const { searchBy, valueSearch } = search;
        
        const result: Wedding[] | null = await this.weddingModel.findAll(
            { 
                where: { [searchBy]: { [Op.substring]: valueSearch} },
                include:
            [
                { model: Hd, as: 'rawBackupOne', attributes: ['id','name'] },
            ],
            },
        );

        if (!result.length) return { code: 400, erro: 'Evento não encontrado' }

        return { code: 200, wedding: result }
    }

    async createWedding(newWeddingCreated:newWedding) {
        // const { error } = validateNewWedding(newWeddingCreated);
        // if (error) return { code: 400, erro: error.message };

        const weddingExist: Wedding | null = await this.weddingModel.findOne({ where: { data: newWeddingCreated.data, localCerimonia: newWeddingCreated.localCerimonia } });
        if (weddingExist) return { code: 400, erro: 'Evento já cadastrado' };

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
        }
        
        const created = await this.weddingModel.create(weddingCreated);
        await this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
        await this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
        await this.hdService.updateUsedGb(Number(created.primeiroBackup));
        await this.hdService.updateUsedGb(Number(created.segundoBackup));

        return { code: 201, wedding: created }
    }

    async updateWedding(id:number, newInfo: weddingUpdate) {
        await this.weddingModel.update(
          {
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
          },
          { where: { id } },
        );

        await this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
        await this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
        await this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
        await this.hdService.updateUsedGb(Number(newInfo.segundoBackup));

        return { code: 201, message: "Casamento alterado" }
    }

    async deleteWedding (id:number) {
        await this.weddingModel.destroy({ where : { id } });
        return { code: 201, message: "Casamento deletado" }
    }

}

export default WeddingService;