import { Request, Response } from 'express';
import CorporateService from '../services/CorporateService';
import Corporate from '../database/models/corporate';
import HdService from '../services/HdService';
import Hd from '../database/models/hd';

class CorporateController {
  constructor(private corporateService = new CorporateService(Corporate, new HdService(Hd))) {}

  getCorporates = async (req: Request, res: Response) => {
    const corporates = await this.corporateService.getCorporates();
    return res.status(corporates.code).json(corporates.corporates);
  };

  getCorporatesBy = async (req: Request, res: Response) => {
    const corporates = await this.corporateService.getCorporatesBy(req.body);
    if(corporates.erro) return res.status(corporates.code).json({ erro: corporates.erro });
    return res.status(corporates.code).json(corporates.corporate);
  };

  deleteCorporate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.corporateService.deleteCorporate(Number(id));
    return res.status(deleted.code).json({ message: deleted.message });
  };

};

export default CorporateController;