import { fireEvent, screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithContext } from './helpers/renderWithContext';
import Weddings from '../pages/Weddings';
// import WeddingDetail from '../pages/WeddingDetail';
import fetchOneWedding from './mocks/fetchsMock/fetchOneWeddingMock';

describe('Testando a página de Casamentos', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchOneWedding);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('se o campo para busca está na tela', () => {
    renderWithContext(<Weddings />);
    const searchInput = screen.getByPlaceholderText('Buscar por');
    expect(searchInput).toBeInTheDocument();
  });
  test('se existem as opções de busca', () => {
    renderWithContext(<Weddings />);
    const optionsInput = screen.getByLabelText(/Escolha/);
    expect(optionsInput).toBeInTheDocument();
  });
  test('Se existe o botão Buscar e se está desabilitado', () => {
    renderWithContext(<Weddings />);
    const button = screen.getByRole('button', { name: 'Buscar' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  test('Se ao fazer uma pesquisa o botão é habilitado', () => {
    renderWithContext(<Weddings />);
    const searchInput = screen.getByPlaceholderText('Buscar por');
    const optionsInput = screen.getByLabelText(/Escolha/);
    const button = screen.getByRole('button', { name: 'Buscar' });

    fireEvent.change(searchInput, { target: { value: 'Noiva' } });
    userEvent.type(optionsInput, 'ana');
    expect(button).not.toBeDisabled();
  });
  test('se ao fazer uma pesquisa válida é exibido um card com o casamento procurado', async () => {
    renderWithContext(<Weddings />);
    const searchInput = screen.getByPlaceholderText('Buscar por');
    const optionsInput = screen.getByLabelText(/Escolha/);
    const button = screen.getByRole('button', { name: 'Buscar' });
    /* fire events that update state */
    fireEvent.change(optionsInput, { target: { value: 'Cidade' } });
    userEvent.type(searchInput, 'Belo Horizonte');
    userEvent.click(button);
    const link = await screen.findByRole('heading', { name: 'Ana & Mateus', level: 2 });
    await waitFor(() => expect(link).toBeInTheDocument());
  });

  // test.only('se ao clicar no casamento encontrado é redirecionado para a página de detalhes do mesmo', async () => {
  //   renderWithContext(<Weddings />);
  //   const searchInput = screen.getByPlaceholderText('Buscar por');
  //   const optionsInput = screen.getByLabelText(/Escolha/);
  //   const button = screen.getByRole('button', { name: 'Buscar' });
  //   /* fire events that update state */
  //   fireEvent.change(optionsInput, { target: { value: 'Cidade' } });
  //   userEvent.type(searchInput, 'Belo Horizonte');
  //   userEvent.click(button);
  //   const link = await screen.findByRole('heading', { name: 'Ana & Mateus', level: 2 });
  //   userEvent.click(link);
  //   await waitFor(() => {
  //     expect(screen.findByRole('heading', { name: 'Informações', level: 1 })).toBeInTheDocument()});
  // });
});

// describe('Testando a página de Casamentos', () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch').mockImplementation('');
//   });
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('é exibida uma mensagem de erro', async () => {
//     renderWithContext(<Weddings />);
//     const searchInput = screen.getByPlaceholderText('Buscar por');
//     const optionsInput = screen.getByLabelText(/Escolha/);
//     const button = screen.getByRole('button', { name: 'Buscar' });
//     /* fire events that update state */
//     fireEvent.change(optionsInput, { target: { value: 'Cidade' } });
//     userEvent.type(searchInput, 'xxxxxx');
//     userEvent.click(button);
//     const erroMessage = await screen.findByRole('heading', { name: 'Evento não encontrado', level: 3 });
//     await waitFor(() => expect(erroMessage).toBeInTheDocument());
//   });
// });
