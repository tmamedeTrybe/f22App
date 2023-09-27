import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithContext } from './helpers/renderWithContext';
import Register from '../pages/Register';
import Home from '../pages/Home';

describe('Testando a página de Login', () => {
  test('se o campo para Email está na tela', () => {
    renderWithContext(<Login />);
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
  });
  test('se o campo para Senha está na tela', () => {
    renderWithContext(<Login />);
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeInTheDocument();
  });
  test('Se existe o botão Entrar e se está desabilitado', () => {
    renderWithContext(<Login />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  test('Se ao clicar em Entrar é direcionado para a pagina Home', () => {
    renderWithContext(<Login />);
    renderWithContext(<Home />);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'tmamede2@gmail.com');
    const passwordInput = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const title = screen.getByRole('heading', { name: 'Início', level: 1 });
    expect(title).toBeInTheDocument();
  });
  test('Se o existe o link para Cadastrar novo usuário e se ao clica-lo é direcionado para a página de registro', () => {
    renderWithContext(<Login />);
    renderWithContext(<Register />);

    const linkRegister = screen.getByText(/Cadastre/);
    expect(linkRegister).toBeInTheDocument();
    userEvent.click(linkRegister);
    const title = screen.getByRole('heading', { name: 'Novo usuário', level: 1 });
    expect(title).toBeInTheDocument();
  });
});
