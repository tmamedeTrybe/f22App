import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando a página Register', () => {
  test('se o campos de nome, acesso, email e senha estão na tela', () => {
    renderWithRouter(<Register />);
    const nameInput = screen.getByPlaceholderText('Nome');
    expect(nameInput).toBeInTheDocument();
    const roleInput = screen.getByPlaceholderText('Acesso');
    expect(roleInput).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText('Senha');
    expect(passwordInput).toBeInTheDocument();
  });
  test('Se existe o botão "Cadastrar" e se está desabilitado', () => {
    renderWithRouter(<Register />);
    const button = screen.getByRole('button', { name: 'Cadastrar' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  test('Se ao clicar em "Cadastrar" é direcionado para a pagina Home', () => {
    renderWithRouter(<Register />);
    renderWithRouter(<Home />);

    const nameInput = screen.getByPlaceholderText('Nome');
    userEvent.type(nameInput, 'Thiago Mamede');
    const roleInput = screen.getByPlaceholderText('Acesso');
    userEvent.type(roleInput, 'admin');
    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'tmamede2@gmail.com');
    const passwordInput = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInput, '123456');
    const button = screen.getByRole('button', { name: 'Cadastrar' });
    expect(button).not.toBeDisabled();

    userEvent.click(button);

    const title = screen.getByRole('heading', { name: 'Home', level: 1 });
    expect(title).toBeInTheDocument();
  });
  test('Se o existe o link para retornar na página de Login e se ao clica-lo é direcionado para a página corretamente', () => {
    renderWithRouter(<Login />);
    renderWithRouter(<Register />);

    const linkLogin = screen.getByText(/Retornar/);
    expect(linkLogin).toBeInTheDocument();
    userEvent.click(linkLogin);
    const title = screen.getByRole('heading', { name: 'Login', level: 1 });
    expect(title).toBeInTheDocument();
  });
});
