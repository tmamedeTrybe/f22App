import { Op } from "sequelize";
import Corporate from "../database/models/corporate";
import search from "../interfaces/search";
// import Hd from "../database/models/hd";

class CorporateService {
  constructor(private corporateModel: typeof Corporate) {}

  public getCorporates = async () => {
    // Falta incluir a chave corresponde do HD no rawBackupOne
    const corporates: Corporate[] = await this.corporateModel.findAll();
    return { code: 200, corporates }
  };

  public getCorporatesBy = async (search: search) => {
     // Falta incluir a chave corresponde do HD no rawBackupOne
    const { searchBy, valueSearch } = search;

    const result: Corporate[] | null = await this.corporateModel.findAll(
      {
        where: { [searchBy]: { [Op.substring]: valueSearch } }
      },
    );
    
    if(!result.length) return { code: 400, erro: 'Evento não encontrado' };
    return { code: 200, corporate: result }
  };

  

};

export default CorporateService;