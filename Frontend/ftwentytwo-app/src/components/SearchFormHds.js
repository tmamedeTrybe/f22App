import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/SearchFormHd.module.css';
import HdContext from '../context/HdContext';

function SearchFormHd({ searchOptions, url }) {
  const [searchBy, setSearchBy] = useState('name');
  const [valueSearch, setValueSearch] = useState('');
  const [hdsFounded, setHdsFounded] = useState('');
  const [erro, setErro] = useState('');

  const { changeHds } = useContext(HdContext);

  useEffect(() => {
    changeHds(hdsFounded);
  }, [changeHds, hdsFounded]);

  const disabledButton = !valueSearch;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchBy,
        valueSearch,
      }),
    });
    const userData = await response.json();

    if (userData.erro) {
      setErro(userData.erro);
      setHdsFounded('');
      setValueSearch('');
    } else {
      setErro('');
      setHdsFounded(userData);
      setValueSearch('');
    }
  };

  return (
    <div className={ styles.container }>
      <form className={ styles.form } onSubmit={ handleSubmit }>
        <label className={ styles.label } aria-labelledby="searchBy">
          Escolha a opção de busca
          <select
            name="searchBy"
            type="text"
            value={ searchBy }
            onChange={ (event) => setSearchBy(event.target.value) }
          >
            { searchOptions.map((option, i) => (
              <option
                data-testid="select-option"
                key={ i }
                value={ option }
              >
                { option }
              </option>)) }
          </select>
        </label>
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
      {
        erro && <h3>{ erro }</h3>
      }
    </div>
  );
}

SearchFormHd.propTypes = {
  url: PropTypes.string.isRequired,
  searchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchFormHd;
