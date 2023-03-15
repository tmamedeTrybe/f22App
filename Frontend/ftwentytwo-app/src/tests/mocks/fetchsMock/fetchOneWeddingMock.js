import { oneWeddingMock } from '../responsesMocks/oneWeddingMock';

const fetchOneWedding = (url) => {
  switch (url) {
  case 'http://localhost:3001/casamentos':
    return {
      json: () => (oneWeddingMock),
    };
  default:
    return { json: () => ([]) };
  }
};

export default fetchOneWedding;
