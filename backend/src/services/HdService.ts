import { DefaultDeserializer } from "v8";
import Hd from "../database/models/hd";

class HdService {
	constructor(private HdModel: typeof Hd) {}

	public getAllHds = async () => {
		const hds = await this.HdModel.findAll();
		return { code: 200, hds: hds }
  }
}

export default HdService;