import { Router } from "express";
import CorporateController from "../controllers/CorporateController";
import Corporate from "../database/models/corporate";
import CorporateService from "../services/CorporateService";

const corporateRoutes = Router();

const corporateController = new CorporateController(new CorporateService(Corporate));

corporateRoutes.get('/corporate', corporateController.getCorporates);
corporateRoutes.post('/corporate', corporateController.getCorporatesBy);

export default corporateRoutes;

