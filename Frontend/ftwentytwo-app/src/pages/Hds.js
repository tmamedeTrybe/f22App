/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-tabs */
import React, { useContext, useEffect, useState } from 'react';
import HdsTable from '../components/HdsTable';
import HeaderLogo from '../components/HeaderLogo';
import SearchFormHd from '../components/SearchFormHds';
import HdContext from '../context/HdContext';

function Hds() {
  const searchOptions = ['Name', 'Label', 'Capacity', 'Available more than'];
  const [hdsList, setHdsList] = useState('');
  const { hdsFounded } = useContext(HdContext);

  useEffect(() => {
    setHdsList(hdsFounded);
  }, [hdsFounded]);

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
        <SearchFormHd searchOptions={ searchOptions } url="http://localhost:3001/hds" />
        {
          hdsList.length > 0 && <section>
            <HdsTable HdsList={ hdsList } />
          </section>
        }
      </main>
    </div>
  );
}

export default Hds;
