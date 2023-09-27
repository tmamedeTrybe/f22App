import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';
import Weddings from '../pages/Weddings';
import { renderWithContext } from './helpers/renderWithContext';

describe('Testando a rota Home', () => {
  test('Se o título "Inicio" é renderizado na tela', () => {
    renderWithContext(<Home />);
    const titleHome = screen.getByRole('heading', { level: 1, name: 'Início' });
    expect(titleHome).toBeInTheDocument();
  });
  test('Se existe um card para "Casamentos', () => {
    renderWithContext(<Home />);
    const weddingCard = screen.getByRole('heading', { level: 1, name: 'Casamentos' });
    expect(weddingCard).toBeInTheDocument();
  });
  test('Se ao clicar no card Casamentos é renderizado a página de Casamentos', () => {
    renderWithContext(<Home />);
    const weddingCard = screen.getByRole('heading', { level: 1, name: 'Casamentos' });
    userEvent.click(weddingCard);
    renderWithContext(<Weddings />);
    const weddingTitle = screen.getByLabelText('Escolha a opção de busca');
    expect(weddingTitle).toBeInTheDocument();
  });
  test('Se existe um card para "Família', () => {
    renderWithContext(<Home />);
    const familyCard = screen.getByRole('heading', { level: 1, name: 'Família' });
    expect(familyCard).toBeInTheDocument();
  });
  test('Se existe um card para "Gastronomia', () => {
    renderWithContext(<Home />);
    const gastroCard = screen.getByRole('heading', { level: 1, name: 'Gastronomia' });
    expect(gastroCard).toBeInTheDocument();
  });
  test('Se existe um card para "Corporativo"', () => {
    renderWithContext(<Home />);
    const corporativoCard = screen.getByRole('heading', { level: 1, name: 'Corporativo' });
    expect(corporativoCard).toBeInTheDocument();
  });
  test('Se existe um card para "HDs"', () => {
    renderWithContext(<Home />);
    const hdsCard = screen.getByRole('heading', { level: 1, name: 'Hds' });
    expect(hdsCard).toBeInTheDocument();
  });
});
