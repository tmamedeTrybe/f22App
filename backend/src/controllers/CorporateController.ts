import { Request, Response } from 'express';
import CorporateService from '../services/CorporateService';
import Corporate from '../database/models/corporate';
import HdService from '../services/HdService';
import Hd from '../database/models/hd';
import corporate from '../interfaces/corporate';

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

  createCorporate = async (req: Request, res: Response) => {
    const created = await this.corporateService.createCorporate(req.body as corporate);
    if (created.erro) return res.status(created.code).json({ erro: created.erro });
    return res.status(created.code).json({ message: 'Criado com sucesso!', corporate: created.corporate });
  };

  updateCorporate = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await this.corporateService.updateCorporate(Number(id), req.body);
    if(updated.erro) return res.status(updated.code).json({ message: updated.erro });
    return res.status(updated.code).json({ message: updated.message });
  };

  addImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const namePhoto = `../assets/images/corporativo/${id}.jpg`;
    
    const addImage = await this.corporateService.addImage(Number(id), namePhoto);

    return res.status(addImage.code).json({ message: addImage.message });
  };

};

export default CorporateController;