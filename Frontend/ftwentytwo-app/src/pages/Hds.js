/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-tabs */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HdsTable from '../components/HdsTable';
import HeaderLogo from '../components/HeaderLogo';
import SearchFormHd from '../components/SearchFormHds';
import HdContext from '../context/HdContext';
import styles from '../modules/Hds.module.css';

function Hds() {
  const searchOptions = ['Name', 'Label', 'Capacity', 'Available more than'];
  const { hdsFounded, changeHds } = useContext(HdContext);
  //   setHdsList(hdsFounded);
  // }, [hdsFounded]);

  const getAll = async () => {
    const response = await fetch('http://localhost:3001/hds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const hdsData = await response.json();
    changeHds(hdsData);
  };

  return (
    <div className={ styles.container }>
      <HeaderLogo title="HDs" />
      <hr />
      <main className={ styles.main }>
        <button
          type="submit"
          onClick={ getAll }
          className={ styles.buttonAll }
        >
          Buscar todos
        </button>
        <SearchFormHd searchOptions={ searchOptions } url="http://localhost:3001/hds" />
        {
          hdsFounded.length > 0 && <section className={ styles.hds }>
            <HdsTable HdsList={ hdsFounded } />
          </section>
        }
      </main>
      <Link to="/hds/new"> Cadastre novo HD</Link>
    </div>
  );
}

export default Hds;
