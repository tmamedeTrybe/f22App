/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import SearchForm from '../components/SearchForm';
import FamilyCard from '../components/FamilyCard';
import MyContext from '../context/myContext';
import styles from '../modules/Family.module.css';

function Family() {
  const [familiesFounded, setFamiliesFounded] = useState('');
  const searchOptions = ['Data', 'Nome', 'Categoria', 'Local', 'Primeiro_backup'];
  const { jobsFounded } = useContext(MyContext);

  useEffect(() => {
    setFamiliesFounded(jobsFounded);
  }, [jobsFounded]);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Família" />
      <main className={ styles.main }>
        <SearchForm searchOptions={ searchOptions } url="http://localhost:3001/familia" />
        {
          familiesFounded.length > 0
        && <section className={ styles.weddings }>
          { familiesFounded.map((job, i) => (<FamilyCard
            family={ job }
            key={ i }
          />))}
        </section>
        }
      </main>
      <Link
        to="/familia/novo"
        className={ styles.newWeddingLink }
      >
        Cadastre novo evento
      </Link>
    </div>
  );
}

export default Family;
