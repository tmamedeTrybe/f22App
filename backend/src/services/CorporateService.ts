import { Op } from "sequelize";
import Corporate from "../database/models/corporate";
import Hd from "../database/models/hd";
import search from "../interfaces/search";

class CorporateService {
  constructor(private corporateModel: typeof Corporate) {}

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

  

};

export default CorporateService;