import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouter } from './helpers/renderWithRouter';
import Register from '../pages/Register';
import Home from '../pages/Home';

describe('Testando a página de Login', () => {
  test('se o campo para Email está na tela', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
  });
  test('se o campo para Senha está na tela', () => {
    renderWithRouter(<Login />);
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeInTheDocument();
  });
  test('Se existe o botão Entrar e se está desabilitado', () => {
    renderWithRouter(<Login />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  test('Se ao clicar em Entrar é direcionado para a pagina Home', () => {
    renderWithRouter(<Login />);
    renderWithRouter(<Home />);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'tmamede2@gmail.com');
    const passwordInput = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const title = screen.getByRole('heading', { name: 'Home', level: 1 });
    expect(title).toBeInTheDocument();
  });
  test('Se o existe o link para Cadastrar novo usuário e se ao clica-lo é direcionado para a página de registro', () => {
    renderWithRouter(<Login />);
    renderWithRouter(<Register />);

    const linkRegister = screen.getByText(/Cadastre/);
    expect(linkRegister).toBeInTheDocument();
    userEvent.click(linkRegister);
    const title = screen.getByRole('heading', { name: 'Novo usuário', level: 1 });
    expect(title).toBeInTheDocument();
  });
});
