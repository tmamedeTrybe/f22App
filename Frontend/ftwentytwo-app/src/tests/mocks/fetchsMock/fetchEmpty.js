const fetchEmpty = (url) => {
  switch (url) {
  case 'http://localhost:3001/casamentos':
    return {
      json: async () => (''),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchEmpty;
