import { Op } from "sequelize";
import Corporate from "../database/models/corporate";
import Hd from "../database/models/hd";
import corporate from "../interfaces/corporate";
import search from "../interfaces/search";
import HdService from "./HdService";

class CorporateService {
  constructor(private corporateModel: typeof Corporate, private hdService: HdService) {}

  public getCorporates = async () => {
    // Falta incluir a chave corresponde do HD no rawBackupOne
    const corporates: Corporate[] = await this.corporateModel.findAll({ include:
      [
        { model: Hd, as: 'editBackupOne', attributes: ['id','name'] },
      ],
    });
    return { code: 200, corporates }
  };

  public getCorporatesBy = async (search: search) => {
    const { searchBy, valueSearch } = search;

    const result: Corporate[] | null = await this.corporateModel.findAll(
      {
        where: { [searchBy]: { [Op.substring]: valueSearch }
      },
       include:
        [
          { model: Hd, as: 'editBackupOne', attributes: ['id','name'] },
        ],
      },
    );
    
    if(!result.length) return { code: 400, erro: 'Evento não encontrado' };
    return { code: 200, corporate: result }
  };

  public deleteCorporate = async (id: number) => {
    const corporate = await this.corporateModel.findOne({ where: { id } });

    await this.corporateModel.destroy({ where: { id } });

    await this.hdService.updateUsedGb(Number(corporate?.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(corporate?.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(corporate?.primeiroBackup));
    await this.hdService.updateUsedGb(Number(corporate?.segundoBackup));

    return { code: 201, message: "Evento deletado" };
  };

  public createCorporate = async (newCorporateCreate: corporate) => {
    const corporateExist: Corporate | null = await this.corporateModel.findOne({
      where: {
        data: newCorporateCreate.data,
        local: newCorporateCreate.local
      }
    });
    if (corporateExist) return { code: 400, erro: 'Evento já cadastrado' }

    const hdRawOneExist = await this.hdService.validateHdNewJob(
      Number(newCorporateCreate.primeiroBackupBruto),
      Number(newCorporateCreate.primeiroBackupBrutoTamanho)
    );
    if(hdRawOneExist?.erro) return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };

    const hdRawTwoExist = await this.hdService.validateHdNewJob(
      Number(newCorporateCreate.segundoBackupBruto),
      Number(newCorporateCreate.segundoBackupBrutoTamanho)
    );
    if(hdRawTwoExist?.erro) return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };

    const hdEditOneExist = await this.hdService.validateHdNewJob(
      Number(newCorporateCreate.primeiroBackup),
      Number(newCorporateCreate.primeiroBackupTamanho)
    );
    if(hdEditOneExist?.erro) return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };

    const hdEditTwoExist = await this.hdService.validateHdNewJob(
      Number(newCorporateCreate.segundoBackup),
      Number(newCorporateCreate.segundoBackupTamanho)
    );
    if(hdEditTwoExist?.erro) return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };

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

    const created = await this.corporateModel.create(corporateCreated);

    await this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(created.primeiroBackup));
    await this.hdService.updateUsedGb(Number(created.segundoBackup));

    return { code: 201, corporate: created }

  };


};

export default CorporateService;