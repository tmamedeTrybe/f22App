interface hdWithJobs {
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
  rawFamilyOne?: Array<any>;
  rawFamilyTwo?: Array<any>;
  editFamilyOne?: Array<any>;
  editFamilyTwo?: Array<any>;
};

export default hdWithJobs;