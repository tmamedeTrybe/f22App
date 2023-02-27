import { string } from "joi";
import Wedding from "../database/models/wedding";
import searchWeddingbyDate from "../interfaces/searchWedding";
import validateSearchByDate from "../validations/validateSearchByDate";

class WeddingService {
    constructor(private weddingModel: typeof Wedding) {}

    public getWeddings = async () => {
        const weddings = await this.weddingModel.findAll();
        return {code: 200, weddings}
    }

    public getWeddingBy = async (search: searchWeddingbyDate) => {
        const { searchBy, valueSearch } = search;
        // if (searchBy == 'data') {
        //     const validDate = validateSearchByDate(valueSearch);
        //     if (validDate.erro) return { code: 400, erro: validDate.erro };
        // }
        // console.log(searchBy);
        
        const result: Wedding[] | null = await this.weddingModel.findAll({ where: { [searchBy]: valueSearch } });

        if (!result) return { code: 400, erro: 'Evento não encontrado' }

        return { code: 200, wedding: result }

    }
}

export default WeddingService;