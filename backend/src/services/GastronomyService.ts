import { Op } from "sequelize";
import Gastronomy from "../database/models/gastronomy";
import Hd from "../database/models/hd";
import search from "../interfaces/search";

class GastronomyService {
  constructor(private gastronomyModel: typeof Gastronomy ) {}

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
  }

};

export default GastronomyService;