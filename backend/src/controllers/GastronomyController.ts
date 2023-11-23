import { Request, Response } from 'express';
import GastronomyService from '../services/GastronomyService';
import Gastronomy from '../database/models/gastronomy';

class GastronomyController {
  constructor(private gastronomyService = new GastronomyService(Gastronomy)) {}

  public getGastronomies = async (req: Request, res: Response) => {
    const gastronomies = await this.gastronomyService.getGastronomies();
    return res.status(gastronomies.code).json(gastronomies.gastronomies);
  };

  public getGastronomyBy = async (req: Request, res: Response) => {
    const gastronomies = await this.gastronomyService.getGastronomyBy(req.body);
    if(gastronomies.erro) return res.status(gastronomies.code).json({ erro: gastronomies.erro });
    return res.status(gastronomies.code).json(gastronomies.gastronomy);
  }

};

export default GastronomyController;