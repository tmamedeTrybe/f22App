import { Request, Response } from 'express';
import GastronomyService from '../services/GastronomyService';
import Gastronomy from '../database/models/gastronomy';
import HdService from '../services/HdService';
import Hd from '../database/models/hd';

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
  };

  public updateGastronomy = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await this.gastronomyService.updateGastronomy(Number(id), req.body);
    if(updated.erro) return res.status(updated.code).json({ message: updated.erro });
    res.status(updated.code).json({ message: updated.message });
  };

  addImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const namePhoto = `../assets/images/gastronomy/${id}.jpg`;

    const addImage = await this.gastronomyService.addImage(Number(id), namePhoto);

    return res.status(addImage.code).json({ message: addImage.message });
  }

};

export default GastronomyController;