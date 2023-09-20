import { Op } from "sequelize";
import Corporate from "../database/models/corporate";
import Hd from "../database/models/hd";
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


};

export default CorporateService;