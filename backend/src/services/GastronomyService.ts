import { Op } from "sequelize";
import Gastronomy from "../database/models/gastronomy";
import Hd from "../database/models/hd";
import gastronomy from "../interfaces/gastronomy";
import search from "../interfaces/search";
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
        date: newGastronomy.date,
        company: newGastronomy.company
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
      date: newGastronomy.date,
      company: newGastronomy.company,
      event: newGastronomy.event,
      contact: newGastronomy.contact,
      venue: newGastronomy.venue,
      city: newGastronomy.city,
      image: newGastronomy.image, 
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


};

export default GastronomyService;