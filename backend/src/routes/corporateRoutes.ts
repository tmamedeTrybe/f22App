import { Router } from "express";
import CorporateController from "../controllers/CorporateController";
import Corporate from "../database/models/corporate";
import Hd from "../database/models/hd";
import CorporateService from "../services/CorporateService";
import HdService from "../services/HdService";

const corporateRoutes = Router();

const corporateController = new CorporateController(new CorporateService(Corporate, new HdService(Hd)));

corporateRoutes.get('/corporate', corporateController.getCorporates);
corporateRoutes.post('/corporate', corporateController.getCorporatesBy);
corporateRoutes.delete('/corporativo/detalhe/:id', corporateController.deleteCorporate);

export default corporateRoutes;

