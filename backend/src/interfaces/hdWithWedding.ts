interface hdWithWedding {
        id: number;
        name?: string;
        label: string;
        capacity: number;
        used: number;
        available: number;
        rawWeddingsOne?: Array<any>;
        rawWeddingsTwo?: Array<any>;
        editWeddingsOne?: Array<any>;
        editWeddingsTwo?: Array<any>;
};

export default hdWithWedding;