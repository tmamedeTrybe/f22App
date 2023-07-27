interface family {
  id?: number;
  data: string;
  categoria: string;
  nome: string;
  contratante: string;
  imagem?: string | null;
  local: string;
  primeiroBackupBruto?: number | null;
  primeiroBackupBrutoTamanho?: number;
  segundoBackupBruto? : number | number;
  segundoBackupBrutoTamanho?: number;
  primeiroBackup?: number;
  primeiroBackupTamanho?: number;
  segundoBackup?: number;
  segundoBackupTamanho?: number;
}

export default family;