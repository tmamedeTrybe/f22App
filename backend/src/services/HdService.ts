import { DefaultDeserializer } from "v8";
import Hd from "../database/models/hd";
import Wedding from "../database/models/wedding";
import hd from "../interfaces/hd";
import hdUpdate from "../interfaces/hdUpdate";
import searchHd from "../interfaces/searchHd";
import validateNewHd from "../validations/validateNewHd";

class HdService {
	constructor(private HdModel: typeof Hd) {}

	public getAllHds = async () => {
		const hds = await this.HdModel.findAll({ include:
            [
                { model: Wedding, as: 'rawWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupBrutoTamanho'] },
				{ model: Wedding, as: 'rawWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupBrutoTamanho'] },
				{ model: Wedding, as: 'editWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupTamanho'] },
				{ model: Wedding, as: 'editWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupTamanho'] },
            ],
        });
		return { code: 200, hds: hds }
  	}

	public getHdBy = async (search: searchHd ) => {
		const { searchBy, valueSearch } = search;

		if (searchBy == 'Available more than') {
			// Falta Lógica para fazer a pesquisa de hds com disponibilidade acima de..
			const result: Hd[] | null = await this.HdModel.findAll({ 
				where: { 'available': Number(valueSearch)},
				include: [ 
					{ model: Wedding, as: 'rawWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupBrutoTamanho'] },
					{ model: Wedding, as: 'rawWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupBrutoTamanho'] },
					{ model: Wedding, as: 'editWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupTamanho'] },
					{ model: Wedding, as: 'editWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupTamanho'] },
				] 
			});
			if (!result.length) return { code: 400, erro: 'Hd não encontrado' }
        	return { code: 200, hds: result }
		} else {
			const result: Hd[] | null = await this.HdModel.findAll({
				where: { [searchBy]: valueSearch },
				include: [ 
					{ model: Wedding, as: 'rawWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupBrutoTamanho'] },
					{ model: Wedding, as: 'rawWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupBrutoTamanho'] },
					{ model: Wedding, as: 'editWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupTamanho'] },
					{ model: Wedding, as: 'editWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupTamanho'] },
				]
			});
			if (!result.length) return { code: 400, erro: 'Hd não encontrado' }
        	return { code: 200, hds: result }
		}
	}

	public createHd = async (newHd: hd) => {
		const { error } = validateNewHd(newHd);
		if (error) return { code: 400, erro: error.message };

		const hdExist: Hd | null = await this.HdModel.findOne({ where: { name: newHd.name } });
		if (hdExist) return { code: 400, erro: 'HD já cadastrado' }

		const created = {
			name: newHd.name,
			label: newHd.label,
			capacity: newHd.capacity,
			used: newHd.used,
			available: newHd.capacity - newHd.used
		}

		const hdcreated = await this.HdModel.create(created);
		return { code: 201, hd: hdcreated }
	}

	async updateHd(id: number, newInfo: hdUpdate) {
		await this.HdModel.update(
			{
				name: newInfo.name,
				label: newInfo.label,
				capacity: newInfo.capacity,
				used: newInfo.used
			},
			{
				where: { id }
			}
		)
		return { code: 201, message: "HD alterado" }
	}

	public deleteHd = async (id: number) => {
		await this.HdModel.destroy({ where: { id } });
		return { code: 201, message: 'HD deletado' }
	}
}

export default HdService;