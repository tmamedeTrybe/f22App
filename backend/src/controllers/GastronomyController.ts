import { Request, Response } from 'express';
import GastronomyService from '../services/GastronomyService';
import Gastronomy from '../database/models/gastronomy';
import HdService from '../services/HdService';
import Hd from '../database/models/hd';
import { json } from 'sequelize';

class GastronomyController {
  constructor(private gastronomyService = new GastronomyService(Gastronomy, new HdService(Hd))) {}

  public getGastronomies = async (req: Request, res: Response) => {
    const gastronomies = await this.gastronomyService.getGastronomies();
    return res.status(gastronomies.code).json(gastronomies.gastronomies);
  };

  public getGastronomyBy = async (req: Request, res: Response) => {
    const gastronomies = await this.gastronomyService.getGastronomyBy(req.body);
    if(gastronomies.erro) return res.status(gastronomies.code).json({ erro: gastronomies.erro });
    return res.status(gastronomies.code).json(gastronomies.gastronomy);
  };

  public createGastronomy = async (req: Request, res: Response) => {
    const created = await this.gastronomyService.createGastronomy(req.body);
    if(created.erro) return res.status(created.code).json({ erro: created.erro });
    return res.status(created.code).json({ message: 'Criado com sucesso' });
  };

  public deleteGastronomy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.gastronomyService.deleteGastronomy(Number(id));
    return res.status(deleted.code).json({ message: deleted.message });
   }

};

export default GastronomyController;