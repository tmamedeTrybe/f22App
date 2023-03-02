import { oneWeddingMock } from '../responsesMocks/oneWeddingMock';

const fetchOneWedding = (url) => {
  switch (url) {
  case 'http://localhost:3001/casamentos':
    return {
      json: async () => (oneWeddingMock),
    };
  default:
    return { json: async () => ([]) };
  }
};

export default fetchOneWedding;
