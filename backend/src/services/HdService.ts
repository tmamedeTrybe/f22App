import { DefaultDeserializer } from "v8";
import Hd from "../database/models/hd";
import Wedding from "../database/models/wedding";
import hd from "../interfaces/hd";
import hdUpdate from "../interfaces/hdUpdate";
import hdWithWedding from "../interfaces/hdWithWedding";
import newHd from "../interfaces/newHd";
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
		return { code: 200, hds: hds.sort((a: Hd,b: Hd) => a.id - b.id) }
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
        	return { code: 200, hds: result.sort((a: Hd,b: Hd) => a.id - b.id) }
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
        	return { code: 200, hds: result.sort((a: Hd,b: Hd) => a.id - b.id) }
		}
	}

	public createHd = async (newHd: newHd) => {
		console.log(newHd);
		const { error } = validateNewHd(newHd);
		if (error) return { code: 400, erro: error.message };

		const hdExist: Hd | null = await this.HdModel.findOne({ where: { name: newHd.name } });
		if (hdExist) return { code: 400, erro: 'HD já cadastrado' }

		const created = {
			name: newHd.name,
			label: newHd.label,
			capacity: newHd.capacity,
			used: 0,
			available: newHd.capacity
		}

		const hdcreated = await this.HdModel.create(created);
		return { code: 201, hd: hdcreated }
	}

	public updateHd = async (id: number, newInfo: hdUpdate) => {
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

	public updateUsedGb = async (id:number) => {
		let totalSizeFirstRaw;
		let totalSizeSecondRaw;
		let totalSizeFirstEdit;
		let totalSizeSecondEdit;
		const hd:hdWithWedding | null = await this.HdModel.findOne(
			{ 
				where: { id },
				include: [ 
					{ model: Wedding, as: 'rawWeddingsOne', attributes: ['primeiroBackupBrutoTamanho'] },
					{ model: Wedding, as: 'rawWeddingsTwo', attributes: ['segundoBackupBrutoTamanho'] },
					{ model: Wedding, as: 'editWeddingsOne', attributes: ['primeiroBackupTamanho'] },
					{ model: Wedding, as: 'editWeddingsTwo', attributes: ['segundoBackupTamanho'] },
				] 
		},
			);
		if (hd) {
			if(hd.rawWeddingsOne && hd.rawWeddingsOne.length > 0) {
				const values = hd.rawWeddingsOne.reduce((acc, cur) => cur.primeiroBackupBrutoTamanho + acc, 0) ;
				totalSizeFirstRaw = values;
			} else totalSizeFirstRaw = 0;

			if(hd.rawWeddingsTwo && hd.rawWeddingsTwo.length > 0) {
				const values = hd.rawWeddingsTwo.reduce((acc, cur) => cur.segundoBackupBrutoTamanho + acc, 0) ;
				totalSizeSecondRaw = values;
			} else totalSizeSecondRaw = 0;

			if(hd.editWeddingsOne && hd.editWeddingsOne.length > 0) {
				const values = hd.editWeddingsOne.reduce((acc, cur) => cur.primeiroBackupTamanho + acc, 0) ;
				totalSizeFirstEdit = values;
			} else totalSizeFirstEdit = 0;

			if(hd.editWeddingsTwo && hd.editWeddingsTwo.length > 0) {
				const values = hd.editWeddingsTwo.reduce((acc, cur) => cur.segundoBackupTamanho + acc, 0) ;
				totalSizeSecondEdit = values;
			} else totalSizeSecondEdit = 0;

			const result = totalSizeFirstRaw + totalSizeSecondRaw + totalSizeFirstEdit + totalSizeSecondEdit;
			console.log(result);
			

			await this.HdModel.update(
			{
				used: result,
				available: hd.capacity - result
			},
			{
				where: { id }
			}
		)
		}
	}

	public deleteHd = async (id: number) => {
		await this.HdModel.destroy({ where: { id } });
		return { code: 201, message: 'HD deletado' }
	}
}

export default HdService;