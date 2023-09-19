import { Request, Response } from 'express';
import CorporateService from '../services/CorporateService';
import Corporate from '../database/models/corporate';

class CorporateController {
  constructor(private corporateService = new CorporateService(Corporate) ) {}

  getCorporates = async (req: Request, res: Response) => {
    const corporates = await this.corporateService.getCorporates();
    return res.status(corporates.code).json(corporates.corporates);
  };

};

export default CorporateController;