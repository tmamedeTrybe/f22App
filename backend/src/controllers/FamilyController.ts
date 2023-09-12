import { Request, Response } from 'express';
import Family from "../database/models/family";
import Hd from "../database/models/hd";
import newFamily from '../interfaces/newFamily';
import FamilyService from "../services/FamilyService";
import HdService from "../services/HdService";

class FamilyController {
  constructor(private familyService = new FamilyService(Family, new HdService(Hd))) {}

  getFamilies = async (req: Request, res: Response) => {
    const families = await this.familyService.getFamilies();
    return res.status(families.code).json(families.families);
  };

  getFamilyBy = async (req: Request, res: Response) => {
    const families = await this.familyService.getFamilyBy(req.body);
    if(families.erro) return res.status(families.code).json({ erro: families.erro })
    return res.status(families.code).json(families.family);
  };

  createFamily =  async (req: Request, res: Response) => {
    const created = await this.familyService.createFamily(req.body as newFamily);
    if (created.erro) return res.status(created.code).json({ erro: created.erro });
    return res.status(created.code).json({ message: 'Criado com sucesso!', family: created.family });
  };

  deleteFamily = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.familyService.deleteFamily(Number(id));
    return res.status(deleted.code).json({ message: deleted.message });
  };

  updateFamily = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await this.familyService.updateFamily(Number(id), req.body);
    if (updated.erro) return res.status(updated.code).json({ message: updated.erro });
    return res.status(updated.code).json({ message: updated.message })
  };

  addImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const namePhoto = `../assets/images/familia/${id}.jpg`;
    
    const addImage = await this.familyService.addImage(Number(id), namePhoto);

    // if (addImage.erro) return res.status(addImage.code).json({ erro: addImage.erro });
    return res.status(addImage.code).json({ message: addImage.message });
  };

  
};

export default FamilyController;
