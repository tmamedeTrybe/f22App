interface gastronomy {
  id?: number;
  date: string;
  company: string;
  event: string;
  contact: string;
  venue: string;
  city: string;
  image?: string | null;
  primeiroBackupBruto?: number | null;
  primeiroBackupBrutoTamanho?: number;
  segundoBackupBruto? : number | number;
  segundoBackupBrutoTamanho?: number;
  primeiroBackup?: number;
  primeiroBackupTamanho?: number;
  segundoBackup?: number;
  segundoBackupTamanho?: number;
}

export default gastronomy;