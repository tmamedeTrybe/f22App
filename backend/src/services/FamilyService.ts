import { Op } from 'sequelize';
import Family from '../database/models/family';
// import HdService from '../services/HdService';
import Hd from '../database/models/hd';
import search from '../interfaces/search';

class FamilyService {
  // constructor(private familyModel: typeof Family, private hdService: HdService ) {}
  constructor(private familyModel: typeof Family ) {}

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


};

export default FamilyService;