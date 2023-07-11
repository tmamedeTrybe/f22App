interface wedding {
  id?: number;
  data: string;
  noiva: string;
  noivo: string;
  imagem?: string | null;
  localCerimonia?: string;
  localRecepcao?: string;
  primeiroBackupBruto?: number | null;
  primeiroBackupBrutoTamanho?: number;
  segundoBackupBruto?: number;
  segundoBackupBrutoTamanho?: number;
  primeiroBackup?: number;
  primeiroBackupTamanho?: number;
  segundoBackup?: number;
  segundoBackupTamanho?: number;
};

export default wedding;