import { screen } from '@testing-library/react';
import WeddingDetail from '../pages/WeddingDetail';
import { renderWithContext } from './helpers/renderWithContext';
import fetchOneWedding from './mocks/fetchsMock/fetchOneWeddingMock';

describe('Testa a página de Detalhes do Casamento', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchOneWedding);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Se o nome do casal é renderizado', async () => {
    renderWithContext(<WeddingDetail />);
    const nameCouple = await screen.findByText('Ana & Mateus');
    expect(nameCouple).toBeInTheDocument();
  });
});
