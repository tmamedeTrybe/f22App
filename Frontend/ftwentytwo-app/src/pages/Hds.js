/* eslint-disable no-tabs */
import React, { useState } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import SearchForm from '../components/SearchForm';

function Hds() {
  const searchOptions = ['Name', 'Label', 'Capacity', 'Available more than'];
  const [hdslist, setHdsList] = useState('');
  console.log(hdslist);

  const getAll = async () => {
    const response = await fetch('http://localhost:3001/hds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const hdsData = await response.json();
    setHdsList(hdsData);
  };

  return (
    <div>
      <HeaderLogo title="HDs" />
      <hr />
      <main>
        <button
          type="submit"
          onClick={ getAll }
        >
          Buscar todos
        </button>
        <SearchForm searchOptions={ searchOptions } />
        {
          hdslist.length > 0 && <section> Tabela </section>
        }
      </main>
    </div>
  );
}

export default Hds;
