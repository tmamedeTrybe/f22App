import { Request, Response } from 'express';
import Wedding from "../database/models/wedding";
import newWedding from '../interfaces/newWedding';
import WeddingService from "../services/WeddingService";

class WeddingController {
    constructor(private weddingService = new WeddingService(Wedding)) {}

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
        return res.status(update.code).json({ message: update.message });
    }
    
}

export default WeddingController;