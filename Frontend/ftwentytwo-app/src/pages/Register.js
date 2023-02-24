import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import styles from '../modules/Register.module.css';

const MIN_PASSWORD_LEN = 6;

function Register() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const disabledButton = !name || !role || !email || password.length < MIN_PASSWORD_LEN;

  const submitForm = async (event) => {
    const newUser = { name, role, email, password };
    event.preventDefault();
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const userData = await response.json();

    if (userData.erro) {
      setErro(userData.erro);
    } else {
      localStorage.setItem('user', JSON.stringify(userData.user));
      navigate('/home');
    }
  };

  return (
    <div className={ styles.container }>
      <Logo />
      <section className={ styles.main }>
        <h1>Novo usuário</h1>
        <form className={ styles.form } onSubmit={ submitForm }>
          <label htmlFor="name">
            <input
              placeholder="Nome"
              onChange={ (event) => setName(event.target.value) }
              type="text"
              id="name"
              value={ name }
            />
          </label>
          <label htmlFor="role">
            <input
              placeholder="Acesso"
              onChange={ (event) => setRole(event.target.value) }
              type="text"
              id="role"
              value={ role }
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="Email"
              onChange={ (event) => setEmail(event.target.value) }
              type="email"
              id="email"
              value={ email }
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="Senha"
              onChange={ (event) => setPassword(event.target.value) }
              id="senha"
              type="password"
              value={ password }
            />
          </label>
          <button
            type="submit"
            value="login"
            disabled={ disabledButton }
          >
            Cadastrar
          </button>
        </form>
      </section>
      {
        erro && <p>{ erro }</p>
      }
      <Link to="/login"> Retornar para login</Link>
    </div>
  );
}

export default Register;
