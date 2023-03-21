import { DefaultDeserializer } from "v8";
import Hd from "../database/models/hd";
import hd from "../interfaces/hd";
import searchHd from "../interfaces/searchHd";
import validateNewHd from "../validations/validateNewHd";

class HdService {
	constructor(private HdModel: typeof Hd) {}

	public getAllHds = async () => {
		const hds = await this.HdModel.findAll();
		return { code: 200, hds: hds }
  	}

	public getHdBy = async (search: searchHd ) => {
		const { searchBy, valueSearch } = search;

		if (searchBy == 'Available more than') {
			// Falta Lógica para fazer a pesquisa de hds com disponibilidade acima de..
			const result: Hd[] | null = await this.HdModel.findAll({ where: { 'available': Number(valueSearch)} } );
			if (!result.length) return { code: 400, erro: 'Hd não encontrado' }
        	return { code: 200, hds: result }
		} else {
			const result: Hd[] | null = await this.HdModel.findAll({ where: { [searchBy]: valueSearch } });
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
}

export default HdService;