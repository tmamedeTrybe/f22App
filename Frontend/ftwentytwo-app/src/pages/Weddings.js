/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeddingCard from '../components/WeddingCard';
import MyContext from '../context/myContext';
import styles from '../modules/Weddings.module.css';
import SearchForm from '../components/SearchForm';
import HeaderLogo from '../components/HeaderLogo';

function Weddings() {
  const [weddingsFounded, setWeddingsFounded] = useState('');
  const searchOptions = ['Noiva', 'Noivo', 'Data', 'Cidade', 'Local_cerimonia', 'Local_recepcao', 'Primeiro_backup'];
  const { jobsFounded } = useContext(MyContext);

  useEffect(() => {
    setWeddingsFounded(jobsFounded);
  }, [jobsFounded]);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Casamentos" />
      <main className={ styles.main }>
        <SearchForm searchOptions={ searchOptions } url="http://localhost:3001/casamentos" />
        {
          // eslint-disable-next-line max-len, react/jsx-one-expression-per-line
          weddingsFounded.length > 0 && <section className={ styles.weddings }> { weddingsFounded.map((job, i) => <WeddingCard wedding={ job } key={ i } />)} </section>
        }
      </main>
      <Link to="/casamentos/novo"> Cadastre novo casamento</Link>
    </div>
  );
}

export default Weddings;
