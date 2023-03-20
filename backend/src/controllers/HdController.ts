import Hd from "../database/models/hd";
import { Request, Response } from 'express';
import HdService from "../services/HdService";

class HdController {
  constructor(private hdService = new HdService(Hd)) {}

	getAllHds = async (req: Request, res: Response) => {
		const hds = await this.hdService.getAllHds();
		return res.status(hds.code).json( hds.hds )
	}
};

export default HdController;