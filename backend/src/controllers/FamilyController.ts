import { Request, Response } from 'express';
import Family from "../database/models/family";
// import Hd from "../database/models/hd";
import FamilyService from "../services/FamilyService";
// import HdService from "../services/HdService";

class FamilyController {
  // constructor(private familyService = new FamilyService(Family, new HdService(Hd))) {}
  constructor(private familyService = new FamilyService(Family)) {}

  getFamilies = async (req: Request, res: Response) => {
    const families = await this.familyService.getFamilies();
    return res.status(families.code).json(families.families);
  };

  getFamilyBy = async (req: Request, res: Response) => {
    const families = await this.familyService.getFamilyBy(req.body);
    if(families.erro) return res.status(families.code).json({ erro: families.erro })
    return res.status(families.code).json(families.family);
  };

  
};

export default FamilyController;
