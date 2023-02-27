import { Request, Response } from 'express';
import Wedding from "../database/models/wedding";
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
    
}

export default WeddingController;