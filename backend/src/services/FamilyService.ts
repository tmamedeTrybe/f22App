import { Op } from 'sequelize';
import Family from '../database/models/family';
import HdService from '../services/HdService';
import Hd from '../database/models/hd';
import newFamily from '../interfaces/newFamily';
import search from '../interfaces/search';

class FamilyService {
  constructor(private familyModel: typeof Family, private hdService: HdService ) {}
  // constructor(private familyModel: typeof Family ) {}

  public getFamilies = async () => {
    const families = await this.familyModel.findAll({ include:
      [
        { model: Hd, as: 'rawBackupOne', attributes: ['id','name', 'used'] },
      ],
    });
    return { code: 200, families };
  };

  public getFamilyBy = async (search: search) => {
    const { searchBy, valueSearch } = search;

    const result: Family[] | null = await this.familyModel.findAll(
      {
        where: {[searchBy]: { [Op.substring]: valueSearch }
      },
        include: [{ model: Hd, as: 'rawBackupOne', attributes: ['id','name']}],
    });

    if (!result.length) return { code: 400, erro: 'Evento não encontrado' };
      return { code: 200, family: result };

  };

  public createFamily = async (newFamilyCreated: newFamily) => {
    const familyExist: Family | null = await this.familyModel.findOne({
      where: {
        data: newFamilyCreated.data,
        local: newFamilyCreated.local
      }
    });
    if (familyExist) return { code: 400, erro: 'Evento já cadastrado' }

    const hdRawOneExist = await this.hdService.validateHdNewJob(
      Number(newFamilyCreated.primeiroBackupBruto),
      Number(newFamilyCreated.primeiroBackupBrutoTamanho)
    );
    if(hdRawOneExist?.erro) return { code: hdRawOneExist.code, erro: hdRawOneExist.erro };

    const hdRawTwoExist = await this.hdService.validateHdNewJob(
      Number(newFamilyCreated.segundoBackupBruto),
      Number(newFamilyCreated.segundoBackupBrutoTamanho)
    );
    if(hdRawTwoExist?.erro) return { code: hdRawTwoExist.code, erro: hdRawTwoExist.erro };

    const hdEditOneExist = await this.hdService.validateHdNewJob(
      Number(newFamilyCreated.primeiroBackup),
      Number(newFamilyCreated.primeiroBackupTamanho)
    );
    if(hdEditOneExist?.erro) return { code: hdEditOneExist.code, erro: hdEditOneExist.erro };

    const hdEditTwoExist = await this.hdService.validateHdNewJob(
      Number(newFamilyCreated.segundoBackup),
      Number(newFamilyCreated.segundoBackupTamanho)
    );
    if(hdEditTwoExist?.erro) return { code: hdEditTwoExist.code, erro: hdEditTwoExist.erro };

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
    }

    const created = await this.familyModel.create(familyCreated);

    await this.hdService.updateUsedGb(Number(created.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(created.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(created.primeiroBackup));
    await this.hdService.updateUsedGb(Number(created.segundoBackup));

    return { code: 201, family: created }

  };

  public deleteFamily = async (id: number) => {
    const family = await this.familyModel.findOne({ where: { id } });

    await this.familyModel.destroy({ where: { id } });

    await this.hdService.updateUsedGb(Number(family?.primeiroBackupBruto));
    await this.hdService.updateUsedGb(Number(family?.segundoBackupBruto));
    await this.hdService.updateUsedGb(Number(family?.primeiroBackup));
    await this.hdService.updateUsedGb(Number(family?.segundoBackup));

    return { code: 201, message: "Evento deletado" };
  };


};

export default FamilyService;