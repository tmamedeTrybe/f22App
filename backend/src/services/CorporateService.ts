import Corporate from "../database/models/corporate";
import Hd from "../database/models/hd";

class CorporateService {
  constructor(private corporateModel: typeof Corporate) {}

  public getCorporates = async () => {
    const corporates = await this.corporateModel.findAll();
    return { code: 200, corporates }
  };

};

export default CorporateService;