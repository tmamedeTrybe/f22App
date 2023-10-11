import { Op } from 'sequelize';
import Corporate from '../database/models/corporate';
import Family from '../database/models/family';
import Hd from '../database/models/hd';
import Wedding from '../database/models/wedding';
import hd from '../interfaces/hd';
import hdUpdate from '../interfaces/hdUpdate';
import hdWithJobs from '../interfaces/hdWithJobs';
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
							{ model: Family, as: 'rawFamilyOne', attributes: ['id','categoria','nome', 'data', 'primeiroBackupBrutoTamanho'] },
							{ model: Family, as: 'rawFamilyTwo', attributes: ['id','categoria','nome', 'data', 'segundoBackupBrutoTamanho'] },
							{ model: Family, as: 'editFamilyOne', attributes: ['id','categoria','nome', 'data', 'primeiroBackupTamanho'] },
							{ model: Family, as: 'editFamilyTwo', attributes: ['id','categoria','nome', 'data', 'segundoBackupTamanho'] },
							{ model: Corporate, as: 'rawCorporateOne', attributes: ['id','empresa','evento', 'data', 'primeiroBackupBrutoTamanho'] },
							{ model: Corporate, as: 'rawCorporateTwo', attributes: ['id','empresa','evento', 'data', 'segundoBackupBrutoTamanho'] },
							{ model: Corporate, as: 'editCorporateOne', attributes: ['id','empresa','evento', 'data', 'primeiroBackupTamanho'] },
							{ model: Corporate, as: 'editCorporateTwo', attributes: ['id','empresa','evento', 'data', 'segundoBackupTamanho'] },
            ],
        });
		hds.forEach(async (hd:Hd) => await this.updateUsedGb(hd.id));
		return { code: 200, hds: hds.sort((a: hdWithJobs, b: hdWithJobs) => a.id - b.id) }
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
					{ model: Family, as: 'rawFamilyOne', attributes: ['id','categoria','nome', 'data', 'primeiroBackupBrutoTamanho'] },
					{ model: Family, as: 'rawFamilyTwo', attributes: ['id','categoria','nome', 'data', 'segundoBackupBrutoTamanho'] },
					{ model: Family, as: 'editFamilyOne', attributes: ['id','categoria','nome', 'data', 'primeiroBackupTamanho'] },
					{ model: Family, as: 'editFamilyTwo', attributes: ['id','categoria','nome', 'data', 'segundoBackupTamanho'] },
					{ model: Corporate, as: 'rawCorporateOne', attributes: ['id','empresa','evento', 'data', 'primeiroBackupBrutoTamanho'] },
					{ model: Corporate, as: 'rawCorporateTwo', attributes: ['id','empresa','evento', 'data', 'segundoBackupBrutoTamanho'] },
					{ model: Corporate, as: 'editCorporateOne', attributes: ['id','empresa','evento', 'data', 'primeiroBackupTamanho'] },
					{ model: Corporate, as: 'editCorporateTwo', attributes: ['id','empresa','evento', 'data', 'segundoBackupTamanho'] },
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
						{ model: Family, as: 'rawFamilyOne', attributes: ['id','categoria','nome', 'data', 'primeiroBackupBrutoTamanho'] },
						{ model: Family, as: 'rawFamilyTwo', attributes: ['id','categoria','nome', 'data', 'segundoBackupBrutoTamanho'] },
						{ model: Family, as: 'editFamilyOne', attributes: ['id','categoria','nome', 'data', 'primeiroBackupTamanho'] },
						{ model: Family, as: 'editFamilyTwo', attributes: ['id','categoria','nome', 'data', 'segundoBackupTamanho'] },
						{ model: Corporate, as: 'rawCorporateOne', attributes: ['id','empresa','evento', 'data', 'primeiroBackupBrutoTamanho'] },
						{ model: Corporate, as: 'rawCorporateTwo', attributes: ['id','empresa','evento', 'data', 'segundoBackupBrutoTamanho'] },
						{ model: Corporate, as: 'editCorporateOne', attributes: ['id','empresa','evento', 'data', 'primeiroBackupTamanho'] },
						{ model: Corporate, as: 'editCorporateTwo', attributes: ['id','empresa','evento', 'data', 'segundoBackupTamanho'] },
          ]
			});
			if (!result.length) return { code: 400, erro: 'Hd não encontrado' };
			result.forEach(async (hd:Hd) => await this.updateUsedGb(hd.id));
        return { code: 200, hds: result.sort((a: Hd,b: Hd) => a.id - b.id) };
		}
	};

	public validateHdNewJob = async (id:number, newSize:number) => {
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
			const hdExist: Hd | null = await this.HdModel.findOne({ where:{ id } });
		
			if (!hdExist) return { code: 400, erro: `Hd${id} não existe` };

			const difference = (hdExist.dataValues.available + oldSize) - newSize;
			
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
		let totalWeddingsSizeFirstRaw;
		let totalFamiliesSizeFirtsRaw;
		let totalCorporateSizeFirstRaw;

		let totalWeddingsSizeSecondRaw;
		let totalFamiliesSizeSecondRaw;
		let totalCorporateSizeSecondRaw;


		let totalWeddingsSizeFirstEdit;
		let totalFamiliesSizeFirstEdit;
		let totalCorporteSizeFirstEdit;

		let totalWeddingsSizeSecondEdit;
		let totalFamiliesSizeSecondEdit;
		let totalCorporateSizeSecondEdit;

		const hd:hdWithJobs | null = await this.HdModel.findOne(
			{ 
				where: { id },
				include: [ 
					{ model: Wedding, as: 'rawWeddingsOne', attributes: ['primeiroBackupBrutoTamanho'] },
					{ model: Family, as: 'rawFamilyOne', attributes: ['primeiroBackupBrutoTamanho'] },
					{ model: Corporate, as: 'rawCorporateOne', attributes: ['primeiroBackupBrutoTamanho'] },
					{ model: Wedding, as: 'rawWeddingsTwo', attributes: ['segundoBackupBrutoTamanho'] },
					{ model: Family, as: 'rawFamilyTwo', attributes: ['segundoBackupBrutoTamanho'] },
					{ model: Corporate, as: 'rawCorporateTwo', attributes: ['segundoBackupBrutoTamanho'] },
					{ model: Wedding, as: 'editWeddingsOne', attributes: ['primeiroBackupTamanho'] },
					{ model: Family, as: 'editFamilyOne', attributes: ['primeiroBackupTamanho'] },
					{ model: Corporate, as: 'editCorporateOne', attributes: ['primeiroBackupTamanho'] },
					{ model: Wedding, as: 'editWeddingsTwo', attributes: ['segundoBackupTamanho'] },
					{ model: Family, as: 'editFamilyTwo', attributes: ['segundoBackupTamanho'] },
					{ model: Corporate, as: 'editCorporateTwo', attributes: ['segundoBackupTamanho'] },
				] 
		  },
    );

		if (hd) {
			if(hd.rawWeddingsOne && hd.rawWeddingsOne.length > 0) {
				const values = hd.rawWeddingsOne.reduce((acc, cur) => cur.primeiroBackupBrutoTamanho + acc, 0);
				totalWeddingsSizeFirstRaw = values;
			} else totalWeddingsSizeFirstRaw = 0;

			if(hd.rawFamilyOne && hd.rawFamilyOne.length > 0) {
				const values = hd.rawFamilyOne.reduce((acc, cur) => cur.primeiroBackupBrutoTamanho + acc, 0 );
				totalFamiliesSizeFirtsRaw = values;
			} else totalFamiliesSizeFirtsRaw = 0;

			if(hd.rawCorporateOne && hd.rawCorporateOne.length > 0) {
				const values = hd.rawCorporateOne.reduce((acc, cur) => cur.primeiroBackupBrutoTamanho + acc, 0 );
				totalCorporateSizeFirstRaw = values;
			} else totalCorporateSizeFirstRaw = 0;

			if(hd.rawWeddingsTwo && hd.rawWeddingsTwo.length > 0) {
				const values = hd.rawWeddingsTwo.reduce((acc, cur) => cur.segundoBackupBrutoTamanho + acc, 0) ;
				totalWeddingsSizeSecondRaw = values;
			} else totalWeddingsSizeSecondRaw = 0;

			if(hd.rawFamilyTwo && hd.rawFamilyTwo.length > 0) {
				const values = hd.rawFamilyTwo.reduce((acc, cur) => cur.segundoBackupBrutoTamanho + acc, 0) ;
				totalFamiliesSizeSecondRaw = values;
			} else totalFamiliesSizeSecondRaw = 0;

			if(hd.rawCorporateTwo && hd.rawCorporateTwo.length > 0) {
				const values = hd.rawCorporateTwo.reduce((acc, cur) => cur.segundoBackupBrutoTamanho + acc, 0) ;
				totalCorporateSizeSecondRaw = values;
			} else totalCorporateSizeSecondRaw = 0;

			if(hd.editWeddingsOne && hd.editWeddingsOne.length > 0) {
				const values = hd.editWeddingsOne.reduce((acc, cur) => cur.primeiroBackupTamanho + acc, 0) ;
				totalWeddingsSizeFirstEdit = values;
			} else totalWeddingsSizeFirstEdit = 0;

			if(hd.editFamilyOne && hd.editFamilyOne.length > 0) {
				const values = hd.editFamilyOne.reduce((acc, cur) => cur.primeiroBackupTamanho + acc, 0) ;
				totalFamiliesSizeFirstEdit = values;
			} else totalFamiliesSizeFirstEdit = 0;

			if(hd.editCorporateOne && hd.editCorporateOne.length > 0) {
				const values = hd.editCorporateOne.reduce((acc, cur) => cur.primeiroBackupTamanho + acc, 0) ;
				totalCorporteSizeFirstEdit = values;
			} else totalCorporteSizeFirstEdit = 0;

			if(hd.editWeddingsTwo && hd.editWeddingsTwo.length > 0) {
				const values = hd.editWeddingsTwo.reduce((acc, cur) => cur.segundoBackupTamanho + acc, 0) ;
				totalWeddingsSizeSecondEdit = values;
			} else totalWeddingsSizeSecondEdit = 0;

			if(hd.editFamilyTwo && hd.editFamilyTwo.length > 0) {
				const values = hd.editFamilyTwo.reduce((acc, cur) => cur.segundoBackupTamanho + acc, 0) ;
				totalFamiliesSizeSecondEdit = values;
			} else totalFamiliesSizeSecondEdit = 0;

			if(hd.editCorporateTwo && hd.editCorporateTwo.length > 0) {
				const values = hd.editCorporateTwo.reduce((acc, cur) => cur.segundoBackupTamanho + acc, 0) ;
				totalCorporateSizeSecondEdit = values;
			} else totalCorporateSizeSecondEdit = 0;

			const totalSizeFirstRaw = totalWeddingsSizeFirstRaw + totalFamiliesSizeFirtsRaw + totalCorporateSizeFirstRaw;
			const totalSizeSecondRaw = totalWeddingsSizeSecondRaw + totalFamiliesSizeSecondRaw + totalCorporateSizeSecondRaw;
			const totalSizeFirstEdit = totalWeddingsSizeFirstEdit + totalFamiliesSizeFirstEdit + totalCorporteSizeFirstEdit;
			const totalSizeSecondEdit = totalWeddingsSizeSecondEdit + totalFamiliesSizeSecondEdit + totalCorporateSizeSecondEdit;

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