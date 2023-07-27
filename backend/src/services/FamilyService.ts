import Family from '../database/models/family';
import HdService from '../services/HdService';
import Hd from '../database/models/hd';

class FamilyService {
  constructor(private familyModel: typeof Family, private hdService: HdService ) {}

  public getFamilies = async () => {
    const family = await this.familyModel.findAll({ include:
      [
        { model: Hd, as: 'rawBackupOne', attributes: ['id','name'] },
      ],
    });
    return { code: 200, family };
  };
}

export default FamilyService;