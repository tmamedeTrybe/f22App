/* eslint-disable react/jsx-closing-tag-location */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeddingCard from '../components/WeddingCard';
import MyContext from '../context/myContext';
import styles from '../modules/Jobs.module.css';
import SearchForm from '../components/SearchForm';
import HeaderLogo from '../components/HeaderLogo';

function Weddings() {
  const [weddingsFounded, setWeddingsFounded] = useState('');
  const searchOptions = ['Data', 'Noiva', 'Noivo',
    'Cidade', 'Local_cerimonia', 'Local_recepcao', 'Primeiro_backup'];
  const { jobsFounded } = useContext(MyContext);

  useEffect(() => {
    setWeddingsFounded(jobsFounded);
    console.log('eventos - ', jobsFounded);
  }, [jobsFounded]);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Casamentos" />
      <main className={ styles.main }>
        <SearchForm searchOptions={ searchOptions } url="http://localhost:3001/casamentos" />
        {
          weddingsFounded
          && <section className={ styles.job }>
            { weddingsFounded.map((job, i) => (<WeddingCard
              wedding={ job }
              key={ i }
            />))}
          </section>
        }
      </main>
      <Link
        to="/casamentos/novo"
        className={ styles.newJobLink }
      >
        Cadastre novo casamento
      </Link>
    </div>
  );
}

export default Weddings;
