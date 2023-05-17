import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import styles from '../modules/NewHd.module.css';

function NewHd() {
  const [label, setLabel] = useState('');
  const [capacity, setCapacity] = useState('');
  const [erro, setErro] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = async (event) => {
    const newHdCreated = {
      label,
      capacity: Number(capacity),
    };
    event.preventDefault();

    const response = await fetch('http://localhost:3001/hds/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHdCreated),
    });

    const hdData = await response.json();

    if (hdData.erro) {
      setErro(hdData.erro);
    } else {
      setMessage(hdData.message);
      setErro('');
    }
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Novo HD" />
      <main className={ styles.main }>
        <form onSubmit={ submitForm } className={ styles.form }>
          <label htmlFor="label">
            <input
              placeholder="Label"
              type="text"
              value={ label }
              onChange={ (event) => setLabel(event.target.value) }
              id="label"
            />
          </label>
          <label htmlFor="capacity">
            <input
              placeholder="Capacity"
              type="number"
              value={ capacity }
              onChange={ (event) => setCapacity(event.target.value) }
              id="capacity"
            />
          </label>
          <button
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </main>
      {
        erro && <p>{ erro }</p>
      }
      {
        message && <p>{ message }</p>
      }
      <Link to="/hds"> Retornar para HDs</Link>
    </div>
  );
}

export default NewHd;
