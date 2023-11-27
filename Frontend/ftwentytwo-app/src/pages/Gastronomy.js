/* eslint-disable react/jsx-closing-tag-location */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import SearchForm from '../components/SearchForm';
import MyContext from '../context/myContext';
import styles from '../modules/Jobs.module.css';
import GastronomyCard from '../components/GastronomyCard';

function Gastronomy() {
  const [gastronomiesFounded, setGastronomiesFounded] = useState('');
  const searchOptions = ['date', 'company', 'event', 'contact', 'primeiroBackup'];
  const { jobsFounded } = useContext(MyContext);

  useEffect(() => {
    setGastronomiesFounded(jobsFounded);
  }, [jobsFounded]);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Gastronomia" />
      <main className={ styles.main }>
        <SearchForm searchOptions={ searchOptions } url="http://localhost:3001/gastronomy" />
        {
          gastronomiesFounded.length > 0
          && <section className={ styles.job }>
            {
              gastronomiesFounded.map((job, i) => (<GastronomyCard
                gastronomy={ job }
                key={ i }
              />))
            }
          </section>
        }
      </main>
      <Link
        to="/gastronomia/novo"
        className={ styles.newJobLink }
      >
        Cadastre novo Gastronomia
      </Link>
    </div>
  );
}

export default Gastronomy;
