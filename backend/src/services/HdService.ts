import { DefaultDeserializer } from "v8";
import Hd from "../database/models/hd";
import searchHd from "../interfaces/searchHd";

class HdService {
	constructor(private HdModel: typeof Hd) {}

	public getAllHds = async () => {
		const hds = await this.HdModel.findAll();
		return { code: 200, hds: hds }
  	}

	public getHdBy = async (search: searchHd ) => {
		const { searchBy, valueSearch } = search;

		if (searchBy == 'available more than') {
			// Falta Lógica para fazer a pesquisa de hds com disponibilidade acima de..
			const result: Hd[] | null = await this.HdModel.findAll({ where: { 'available': Number(valueSearch)} } );
			if (!result.length) return { code: 400, erro: 'Evento não encontrado' }
        	return { code: 200, hds: result }
		} else {
			const result: Hd[] | null = await this.HdModel.findAll({ where: { [searchBy]: valueSearch } });
			if (!result.length) return { code: 400, erro: 'Evento não encontrado' }
        	return { code: 200, hds: result }
		}
	}
}

export default HdService;