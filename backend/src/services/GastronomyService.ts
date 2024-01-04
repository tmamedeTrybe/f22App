import { Op } from "sequelize";
import Gastronomy from "../database/models/gastronomy";
import Hd from "../database/models/hd";
import gastronomy from "../interfaces/gastronomy";
import search from "../interfaces/search";
import validateUpdateGastronomy from "../validations/validateUpdateGastronomy";
import HdService from "./HdService";

class GastronomyService {
  constructor(private gastronomyModel: typeof Gastronomy, private hdService: HdService ) {}

  public getGastronomies = async () => {
    const gastronomies: Gastronomy[] = await this.gastronomyModel.findAll({include: 
    [
      { model: Hd, as: 'editBackupOne', attributes: ['id', 'name'] },
    ]
    });
    return { code: 200, gastronomies }
  };

  public getGastronomyBy = async (search: search) => {
    const { searchBy, valueSearch } = search;

    const result = await this.gastronomyModel.findAll(
      {
        where: { [searchBy]: { [Op.substring]: valueSearch } },
        include:
          [
            { model: Hd, as: 'editBackupOne', attributes: ['id', 'name']  },
          ],
      },
    );

    if(!result.length) return { code: 400, erro: 'Evento não encontrado' };
    return { code: 200, gastronomy: result }
  };

  public createGastronomy = async (newGastronomy: gastronomy) => {
    const gastronomyExist: Gastronomy | null = await this.gastronomyModel.findOne({
      where: {
        data: newGastronomy.data,
        empresa: newGastronomy.empresa
      }
    });
    if (gastronomyExist) return { code: 400, erro: 'Evento já cadastrado'};

    const hdRawOneExist = await this.hdService.validateHdNewJob(
      Number(newGastronomy.primeiroBackupBruto),
      Number(newGastronomy.primeiroBackupBrutoTamanho)
    );
    if(hdRawOneExist?.erro) return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };

    const hdRawTwoExist = await this.hdService.validateHdNewJob(
      Number(newGastronomy.segundoBackupBruto),
      Number(newGastronomy.segundoBackupBrutoTamanho)
    );
    if(hdRawTwoExist?.erro) return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };

    const hdEditOneExist = await this.hdService.validateHdNewJob(
      Number(newGastronomy.primeiroBackup),
      Number(newGastronomy.primeiroBackupTamanho)
    );
    if(hdEditOneExist?.erro) return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };

    const hdEditTwoExist = await this.hdService.validateHdNewJob(
      Number(newGastronomy.segundoBackup),
      Number(newGastronomy.segundoBackupTamanho)
    );
    if(hdEditTwoExist?.erro) return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };

    const gastronomyCreated = {
      data: newGastronomy.data,
      empresa: newGastronomy.empresa,
      evento: newGastronomy.evento,
      contato: newGastronomy.contato,
      local: newGastronomy.local,
      cidade: newGastronomy.cidade,
      imagem: newGastronomy.imagem, 
      primeiroBackupBruto: newGastronomy.primeiroBackupBruto,
      primeiroBackupBrutoTamanho: newGastronomy.primeiroBackupBrutoTamanho,
      segundoBackupBruto: newGastronomy.segundoBackupBruto,
      segundoBackupBrutoTamanho: newGastronomy.segundoBackupBrutoTamanho,
      primeiroBackup: newGastronomy.primeiroBackup,
      primeiroBackupTamanho: newGastronomy.primeiroBackupTamanho,
      segundoBackup: newGastronomy.segundoBackup,
      segundoBackupTamanho: newGastronomy.segundoBackupTamanho
    };

    const created = await this.gastronomyModel.create(gastronomyCreated);

    await this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(created.primeiroBackup));
    await this.hdService.updateUsedGb(Number(created.segundoBackup));    

    return { code: 201, gastronomy: created }

  };

  public deleteGastronomy = async (id: number) => {
    const gastronomy = await this.gastronomyModel.findOne({ where: { id } });

    await this.gastronomyModel.destroy({ where: { id } });

    await this.hdService.updateUsedGb(Number(gastronomy?.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(gastronomy?.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(gastronomy?.primeiroBackup));
    await this.hdService.updateUsedGb(Number(gastronomy?.segundoBackup));

    return { code:  201, message: "Evento deletado" };
  };

  public updateGastronomy = async (id: number, newInfo: gastronomy) => {
    const { error } = validateUpdateGastronomy(newInfo);
    if (error) return { code: 400, erro: error.message };

    const gastronomy = await this.gastronomyModel.findOne({ where: { id } }) as Gastronomy;

    const hdRawOneExist = await this.hdService.validateHd(
      Number(newInfo.primeiroBackupBruto),
      Number(gastronomy.primeiroBackupBrutoTamanho),
      Number(newInfo.primeiroBackupBrutoTamanho)
    );
    if(hdRawOneExist?.erro) return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };

    const hdEditOneExist = await this.hdService.validateHd(
      Number(newInfo.primeiroBackup),
      Number(gastronomy.primeiroBackupTamanho),
      Number(newInfo.primeiroBackupTamanho)
    );
    if(hdEditOneExist?.erro) return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };

    const hdEditTwoExist = await this.hdService.validateHd(
      Number(newInfo.segundoBackup),
      Number(gastronomy.segundoBackupTamanho),
      Number(newInfo.segundoBackupTamanho)
    );
    if(hdEditTwoExist?.erro) return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };

    await this.gastronomyModel.update(
      {
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
        primeiroBackupTamanho: newInfo.primeiroBackupTamanho,
        segundoBackup: newInfo.segundoBackup === 0 ? null : newInfo.segundoBackup,
        segundoBackupTamanho: newInfo.segundoBackupTamanho
      },
      { where: { id } }
    );

    await this.hdService.updateUsedGb(Number(gastronomy?.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(gastronomy?.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(gastronomy?.primeiroBackup));
    await this.hdService.updateUsedGb(Number(gastronomy?.segundoBackup));

    await this.hdService.updateUsedGb(Number(newInfo.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(newInfo.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(newInfo.primeiroBackup));
    await this.hdService.updateUsedGb(Number(newInfo.segundoBackup));

    return { code: 201, message: "Evento alterado" }

  };


};

export default GastronomyService;