import { Request, Response } from 'express';
import Hd from '../database/models/hd';
import Wedding from '../database/models/wedding';
import newWedding from '../interfaces/newWedding';
import HdService from '../services/HdService';
import WeddingService from '../services/WeddingService';

class WeddingController {
    constructor(private weddingService = new WeddingService(Wedding, new HdService(Hd))) {}

    getWeddings = async (req: Request, res: Response) => {
        const weddings = await this.weddingService.getWeddings();
        return res.status(weddings.code).json(weddings.weddings);
    }

    getWeddingBy = async (req: Request, res: Response) => {
        const wedding = await this.weddingService.getWeddingBy(req.body);
        if (wedding.erro) return res.status(wedding.code).json({ erro: wedding.erro });
        return res.status(wedding.code).json(wedding.wedding);
    }

    createWedding = async (req: Request, res: Response) => {
        const created = await this.weddingService.createWedding(req.body as newWedding);
        if (created.erro) return res.status(created.code).json({ erro: created.erro });
        return res.status(created.code).json({ message: 'Criado com sucesso!', wedding: created.wedding });
    }

    updateWedding = async (req: Request, res: Response) => {
        const { id } = req.params;
        const update = await this.weddingService.updateWedding(Number(id), req.body);
        if (update.erro) return res.status(update.code).json({ erro: update.erro })
        return res.status(update.code).json({ message: update.message });
    }

    deleteWedding = async (req: Request, res: Response) => {
        const { id } = req.params;
        const deleted = await this.weddingService.deleteWedding(Number(id));
        res.status(deleted.code).json({ message: deleted.message });
    }
    
    addImage = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        const namePhoto = `../assets/images/casamentos/${id}.jpg`;
        
        const addImage = await this.weddingService.addImage(Number(id), namePhoto);

        if (addImage.erro) return res.status(addImage.code).json({ erro: addImage.erro });
        return res.status(addImage.code).json({ message: addImage.message });
    }


}

export default WeddingController;