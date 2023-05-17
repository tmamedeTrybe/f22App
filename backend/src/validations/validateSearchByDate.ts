const validateSearchByDate = (valueSearch: Date) => {
  if (valueSearch !instanceof Date) return { code: 400, erro: 'Formato de data deve ser YYYYMMDD'}
  return { code: 200 };
};

export default validateSearchByDate;