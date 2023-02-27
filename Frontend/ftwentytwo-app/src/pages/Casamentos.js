import React, { useState } from 'react';
import Logo from '../components/Logo';
import styles from '../modules/Casamentos.module.css';

function Casamentos() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchBy, setSearchBy] = useState('');
  const [valueSearch, setValueSearch] = useState('');

  const disabledButton = !valueSearch;

  return (
    <div className={ styles.container }>
      <Logo />
      <h1>Casamentos</h1>
      <header>
        <h1>
          {`Olá ${user.name}`}
        </h1>
      </header>
      <main className={ styles.main }>
        <form className={ styles.form }>
          <select
            type="text"
            value={ searchBy }
            onChange={ (event) => setSearchBy(event.target.value) }
          >
            <option>Noiva</option>
            <option>Noivo</option>
            <option>Data</option>
            <option>Local</option>
          </select>
          <label htmlFor="valueSearch">
            <input
              placeholder="Buscar por"
              type="text"
              value={ valueSearch }
              onChange={ (event) => setValueSearch(event.target.value) }
            />
          </label>
          <button
            type="submit"
            disabled={ disabledButton }
          >
            Buscar
          </button>
        </form>

      </main>
    </div>
  );
}

export default Casamentos;
