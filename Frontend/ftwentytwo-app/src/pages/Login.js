import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import styles from '../modules/Login.module.css';
import MyContext from '../context/myContext';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const disabledButton = !email || password.length < MIN_PASSWORD_LENGTH;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const userData = await response.json();
    console.log(userData.user.name);

    if (userData.erro) {
      setErro(userData.erro);
    } else {
      setUser(userData.user.name);
      navigate('/home');
    }
  };

  return (
    <div className={ styles.container }>
      <Logo />
      <section className={ styles.main }>
        <h1>Login</h1>
        <form className={ styles.form } onSubmit={ handleSubmit }>
          <label htmlFor="email">
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={ email }
              onChange={ (event) => setEmail(event.target.value) }
            />
          </label>
          <label htmlFor="password">
            <input
              placeholder="Senha"
              type="password"
              id="password"
              value={ password }
              onChange={ (event) => setPassword(event.target.value) }
            />
          </label>
          <button
            disabled={ disabledButton }
          >
            Entrar
          </button>
        </form>
      </section>
      {
        erro && <p>{ erro }</p>
      }
      <Link to="/register"> Cadastre novo usuário</Link>
    </div>
  );
}

export default Login;
