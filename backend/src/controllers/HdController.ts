import Hd from '../database/models/hd';
import { Request, Response } from 'express';
import HdService from '../services/HdService';

class HdController {
  constructor(private hdService = new HdService(Hd)) {}

	getAllHds = async (req: Request, res: Response) => {
		const hds = await this.hdService.getAllHds();
		return res.status(hds.code).json(hds.hds);
	}

	getHdBy = async (req: Request, res: Response) => {
		const hds = await this.hdService.getHdBy(req.body);
		if (hds.erro) return res.status(hds.code).json({ erro: hds.erro });
		return res.status(hds.code).json(hds.hds);
	}

	createHd = async (req: Request, res: Response) => {
		const createdHd = await this.hdService.createHd(req.body);
		if (createdHd.erro) return res.status(createdHd.code).json({ erro: createdHd.erro });
		return res.status(createdHd.code).json({ message: 'Criado com sucesso!', hd: createdHd.hd });
	}

	updateHd = async (req: Request, res: Response) => {
		const { id } = req.params;
		const update = await this.hdService.updateHd(Number(id), req.body);
		return res.status(update.code).json({ message: update.message })
	}

	deleteHd = async (req: Request, res: Response) => {
		const { id } = req.params;
		const deleted = await this.hdService.deleteHd(Number(id));
		return res.status(deleted.code).json({ message: deleted.message })
	}
};

export default HdController;