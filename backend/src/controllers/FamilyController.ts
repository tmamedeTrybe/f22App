import { Request, Response } from 'express';
import Family from "../database/models/family";
import Hd from "../database/models/hd";
import FamilyService from "../services/FamilyService";
import HdService from "../services/HdService";

class FamilyController {
  constructor(private familyService = new FamilyService(Family, new HdService(Hd))) {}

  getFamily = async (req: Request, res: Response) => {
    const family = await this.familyService.getFamilies();
    return res.status(family.code).json(family.family);
  };
};

export default FamilyController;
