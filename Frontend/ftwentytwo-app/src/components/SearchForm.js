import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../modules/SearchForm.module.css';
import MyContext from '../context/myContext';

function SearchForm({ searchOptions, url }) {
  const [searchBy, setSearchBy] = useState('noiva');
  const [valueSearch, setValueSearch] = useState('');
  const [jobsFounded, setjobsFounded] = useState('');
  const [erro, setErro] = useState('');

  const { changeJobs } = useContext(MyContext);

  useEffect(() => {
    changeJobs(jobsFounded);
  }, [changeJobs, jobsFounded]);

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
    } else {
      setjobsFounded(userData);
    }
  };

  return (
    <div className={ styles.container }>
      <form className={ styles.form } onSubmit={ handleSubmit }>
        <select
          type="text"
          value={ searchBy }
          onChange={ (event) => setSearchBy(event.target.value) }
        >
          { searchOptions.map((option, i) => (
            <option
              key={ i }
            >
              { option }
            </option>)) }
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
      {
        erro && <p>{ erro }</p>
      }
    </div>
  );
}

SearchForm.propTypes = {
  url: PropTypes.string.isRequired,
  searchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchForm;
