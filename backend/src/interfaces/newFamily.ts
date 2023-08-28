interface newFamily {
  data: string;
  categoria: string;
  nome: string;
  contratante: string;
  imagem?: object;
  local?: string; 
  primeiroBackupBruto?: number;
  primeiroBackupBrutoTamanho?: number;
  segundoBackupBruto?: number;
  segundoBackupBrutoTamanho?: number;
  primeiroBackup?: number;
  primeiroBackupTamanho?: number;
  segundoBackup?: number;
  segundoBackupTamanho?: number;
}

export default newFamily;