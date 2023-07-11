import { Op } from 'sequelize';
import Hd from '../database/models/hd';
import Wedding from '../database/models/wedding';
import newWedding from '../interfaces/newWedding';
import searchWeddingbyDate from '../interfaces/searchWedding';
import weddingUpdate from '../interfaces/weddingUpdate';
import validateNewWedding from '../validations/validateNewWedding';
import validateUpdateWedding from '../validations/validateUpdateWedding';
import HdService from './HdService';


class WeddingService {
    constructor(private weddingModel: typeof Wedding, private hdService: HdService) {}

    public getWeddings = async () => {
      const weddings = await this.weddingModel.findAll({ include:
        [
          { model: Hd, as: 'rawBackupOne', attributes: ['id','name'] },
        ],
      });
      return { code: 200, weddings };
    };

    public getWeddingBy = async (search: searchWeddingbyDate) => {
      const { searchBy, valueSearch } = search;
      
      const result: Wedding[] | null = await this.weddingModel.findAll(
        { 
          where: { [searchBy]: { [Op.substring]: valueSearch } },
          include:
        [
          { model: Hd, as: 'rawBackupOne', attributes: ['id','name'] },
        ],
        },
      );

      if (!result.length) return { code: 400, erro: 'Evento não encontrado' };

      return { code: 200, wedding: result };
    };

    async createWedding(newWeddingCreated:newWedding) {
        // const { error } = validateNewWedding(newWeddingCreated);
        // if (error) return { code: 400, erro: error.message };

        const weddingExist: Wedding | null = await this.weddingModel.findOne({
          where: {  
            data: newWeddingCreated.data,
            localCerimonia: newWeddingCreated.localCerimonia
          } 
        });
        if (weddingExist) return { code: 400, erro: 'Evento já cadastrado' };

        const hdRawOneExist = await this.hdService.validateHdNewWedding(
          Number(newWeddingCreated.primeiroBackupBruto),
          Number(newWeddingCreated.primeiroBackupBrutoTamanho
        ));
        if (hdRawOneExist?.erro) return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };

        const hdRawTwoExist = await this.hdService.validateHdNewWedding(
          Number(newWeddingCreated.segundoBackupBruto),
          Number(newWeddingCreated.segundoBackupBrutoTamanho
        ));
        if (hdRawTwoExist?.erro) return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };

        const hdEditOneExist = await this.hdService.validateHdNewWedding(
          Number(newWeddingCreated.primeiroBackup),
          Number(newWeddingCreated.primeiroBackupTamanho
        ));
        if (hdEditOneExist?.erro) return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };

        const hdEditTwoExist = await this.hdService.validateHdNewWedding(
          Number(newWeddingCreated.segundoBackup),
          Number(newWeddingCreated.segundoBackupTamanho
        ));
        if (hdEditTwoExist?.erro) return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };

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
        
        const created = await this.weddingModel.create(weddingCreated);

        await this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
        await this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
        await this.hdService.updateUsedGb(Number(created.primeiroBackup));
        await this.hdService.updateUsedGb(Number(created.segundoBackup));

        return { code: 201, wedding: created };
    };

    async updateWedding(id:number, newInfo: weddingUpdate) {

      const { error } = validateUpdateWedding(newInfo);
      if (error) return { code: 400, erro: error.message };

      const wedding = await this.weddingModel.findOne({ where: { id } }) as Wedding;

      const hdRawOneExist = await this.hdService.validateHd(
          Number(newInfo.primeiroBackupBruto),
          Number(wedding.primeiroBackupBrutoTamanho),
          Number(newInfo.primeiroBackupBrutoTamanho),
      );
      if (hdRawOneExist?.erro) return { code: hdRawOneExist.code, erro: hdRawOneExist.erro}
      const hdRawTwoExist = await this.hdService.validateHd(
          Number(newInfo.segundoBackupBruto),
          Number(wedding.segundoBackupBrutoTamanho),
          Number(newInfo.segundoBackupBrutoTamanho)
      );
      if (hdRawTwoExist?.erro) return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro}
      const hdEditOneExist = await this.hdService.validateHd(
          Number(newInfo.primeiroBackup),
          Number(wedding.primeiroBackupTamanho),
          Number(newInfo.primeiroBackupTamanho)
      );
      if (hdEditOneExist?.erro) return { code: hdEditOneExist.code, erro: hdEditOneExist.erro}
      const hdEditTwoExist = await this.hdService.validateHd(
          Number(newInfo.segundoBackup),
          Number(wedding.segundoBackupTamanho),
          Number(newInfo.segundoBackupTamanho));
      if (hdEditTwoExist?.erro) return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro}

      await this.weddingModel.update(
        {
          data: newInfo.data,
          cidade: newInfo.cidade,
          noiva: newInfo.noiva,
          noivo: newInfo.noivo,
          imagem: newInfo.imagem,
          localCerimonia: newInfo.localCerimonia,
          localRecepcao: newInfo.localRecepcao,
          primeiroBackupBruto: newInfo.primeiroBackupBruto === 0 ? null : newInfo.primeiroBackupBruto,
          primeiroBackupBrutoTamanho: newInfo.primeiroBackupBrutoTamanho,
          segundoBackupBruto: newInfo.segundoBackupBruto === 0 ? null : newInfo.segundoBackupBruto ,
          segundoBackupBrutoTamanho: newInfo.segundoBackupBrutoTamanho,
          primeiroBackup: newInfo.primeiroBackup === 0 ? null : newInfo.primeiroBackup,
          primeiroBackupTamanho: newInfo.primeiroBackupTamanho,
          segundoBackup: newInfo.segundoBackup === 0 ? null : newInfo.segundoBackup,
          segundoBackupTamanho: newInfo.segundoBackupTamanho
        },
        { where: { id } },
        );

        await this.hdService.updateUsedGb(Number(wedding?.primeiroBackupBruto));
        await this.hdService.updateUsedGb(Number(wedding?.segundoBackupBruto));
        await this.hdService.updateUsedGb(Number(wedding?.primeiroBackup));
        await this.hdService.updateUsedGb(Number(wedding?.segundoBackup));

        await this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
        await this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
        await this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
        await this.hdService.updateUsedGb(Number(newInfo.segundoBackup));


        return { code: 201, message: "Casamento alterado" }
    }

    async deleteWedding (id:number) {
      const wedding = await this.weddingModel.findOne({ where: { id } });

      await this.weddingModel.destroy({ where : { id } });

      await this.hdService.updateUsedGb(Number(wedding?.primeiroBackupBruto));
      await this.hdService.updateUsedGb(Number(wedding?.segundoBackupBruto));
      await this.hdService.updateUsedGb(Number(wedding?.primeiroBackup));
      await this.hdService.updateUsedGb(Number(wedding?.segundoBackup));

      return { code: 201, message: "Casamento deletado" };
    };

    async addImage(id: number, namePhoto: string) {
        const wedding = await this.weddingModel.findOne({ where: { id } });
        
        if (!wedding) return { code: 400, erro: 'Erro ao incluir imagem!' }

        await this.weddingModel.update(
            {
              imagem: namePhoto,
            },
            { where: { id } },
          );
        
        return { code: 201, message: 'Imagem atualizada' }
    }

};

export default WeddingService;