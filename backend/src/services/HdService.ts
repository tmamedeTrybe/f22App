import { Op } from 'sequelize';
import Hd from '../database/models/hd';
import Wedding from '../database/models/wedding';
import hd from '../interfaces/hd';
import hdUpdate from '../interfaces/hdUpdate';
import hdWithWedding from '../interfaces/hdWithWedding';
import newHd from '../interfaces/newHd';
import searchHd from '../interfaces/searchHd';
import validateNewHd from '../validations/validateNewHd';

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
		hds.forEach(async (hd:Hd) => await this.updateUsedGb(hd.id));
		return { code: 200, hds: hds.sort((a: hdWithWedding, b: hdWithWedding) => a.id - b.id) }
  	};

	public getHdBy = async (search: searchHd ) => {
		const { searchBy, valueSearch } = search;

		if (searchBy == 'Available more than') {
			const result: Hd[] | null = await this.HdModel.findAll({ 
				where: { 'available': { [Op.gte]: Number(valueSearch)}},
				include: [ 
					{ model: Wedding, as: 'rawWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupBrutoTamanho'] },
					{ model: Wedding, as: 'rawWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupBrutoTamanho'] },
					{ model: Wedding, as: 'editWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupTamanho'] },
					{ model: Wedding, as: 'editWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupTamanho'] },
				] 
			});
			if (!result.length) return { code: 400, erro: 'Hd não encontrado' };
			result.forEach(async (hd:Hd) => await this.updateUsedGb(hd.id));
        return { code: 200, hds: result.sort((a:hd, b:Hd) => a.id - b.id) };
		  } else {
        const result: Hd[] | null = await this.HdModel.findAll({
          where: { [searchBy]: { [Op.substring]: valueSearch} },
          include: [ 
            { model: Wedding, as: 'rawWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupBrutoTamanho'] },
            { model: Wedding, as: 'rawWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupBrutoTamanho'] },
            { model: Wedding, as: 'editWeddingsOne', attributes: ['id','noiva','noivo', 'data', 'primeiroBackupTamanho'] },
            { model: Wedding, as: 'editWeddingsTwo', attributes: ['id','noiva','noivo', 'data', 'segundoBackupTamanho'] },
          ]
			});
			if (!result.length) return { code: 400, erro: 'Hd não encontrado' };
			result.forEach(async (hd:Hd) => await this.updateUsedGb(hd.id));
        return { code: 200, hds: result.sort((a: Hd,b: Hd) => a.id - b.id) };
		}
	};

	public validateHdNewWedding = async (id:number, newSize:number) => {
		if (id) {
			const hdexist: Hd | null = await this.HdModel.findOne({ where:{ id } });
		
			if (!hdexist) return { code: 400, erro: `Hd${id} não existe` };

			if (hdexist.dataValues.available < newSize) return { code: 400, erro: `Hd${id} não tem ${newSize}GB disponíveis` };
			
			return { code: 200 };
		}
		return;
	};
	
	public validateHd = async (id:number, oldSize:number, newSize:number) => {
		if (id) {
			const hdexist: Hd | null = await this.HdModel.findOne({ where:{ id } });
		
			if (!hdexist) return { code: 400, erro: `Hd${id} não existe` };

			const difference = (hdexist.dataValues.available + oldSize) - newSize;
			
			if (difference < 0) return { code: 400, erro: `Hd${id} não tem ${newSize}GB disponíveis` };
			
			return { code: 200 };
		}
		return;
	};
	
	public createHd = async (newHd: newHd) => {
		const { error } = validateNewHd(newHd);
		if (error) return { code: 400, erro: error.message };

		const created = {
			name: null,
			label: newHd.label,
			capacity: newHd.capacity,
			used: 0,
			available: newHd.capacity
		};

		const hdcreated = await this.HdModel.create(created);
		this.HdModel.update({ name: hdcreated.id }, { where: { id: hdcreated.id } });
		return { code: 201, hd: hdcreated };
	};

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
		);
		return { code: 201, message: "HD alterado" };
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

			const hdUpdated = await this.HdModel.update(
			{
				used: result,
				available: hd.capacity - result
			},
			{
				where: { id }
			}
		)
		return hdUpdated;
		}
	};

	public deleteHd = async (id: number) => {
		await this.HdModel.destroy({ where: { id } });
		return { code: 201, message: 'HD deletado' }
	};
};

export default HdService;