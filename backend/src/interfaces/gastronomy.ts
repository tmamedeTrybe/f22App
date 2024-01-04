interface gastronomy {
  id?: number;
  data: string;
  empresa: string;
  evento: string;
  contato: string;
  local: string;
  cidade: string;
  imagem?: string | null;
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