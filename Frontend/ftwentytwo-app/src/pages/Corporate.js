/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import SearchForm from '../components/SearchForm';
import MyContext from '../context/myContext';
import styles from '../modules/Jobs.module.css';
import CorporateCard from '../components/CorporateCard';

function Corporate() {
  const [corporatesFounded, setCorporatesFounded] = useState('');
  const searchOptions = ['Data', 'Empresa', 'Evento', 'Cidade', 'Primeiro_backup'];
  const { jobsFounded } = useContext(MyContext);

  useEffect(() => {
    setCorporatesFounded(jobsFounded);
  }, [jobsFounded]);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Corporativo" />
      <main className={ styles.main }>
        <SearchForm searchOptions={ searchOptions } url="http://localhost:3001/corporate" />
        {
          corporatesFounded.length > 0
        && <section className={ styles.job }>
          { corporatesFounded.map((job, i) => (<CorporateCard
            corporate={ job }
            key={ i }
          />))}
        </section>
        }
      </main>
      <Link
        to="/corporativo/novo"
        className={ styles.newJobLink }
      >
        Cadastre novo Corporativo
      </Link>
    </div>
  );
}

export default Corporate;
