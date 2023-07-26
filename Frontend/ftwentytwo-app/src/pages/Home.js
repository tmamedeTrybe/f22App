/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, useState } from 'react';
import OptionsCard from '../components/OptionsCard';
import options from '../assets/options';
import styles from '../modules/Home.module.css';
import HeaderLogo from '../components/HeaderLogo';
import Loading from '../components/Loading';

function Home() {
  const [loading, setLoading] = useState(true);
  const [optionsList, setOptionsList] = useState([]);

  useEffect(() => {
    setOptionsList(options);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={ styles.container }>
      <HeaderLogo title="Início" />
      <main className={ styles.main }>
        {
          loading ? <Loading />
            : <section className={ styles.cards }>
              { optionsList.map((option, i) => (
                <section key={ i } className={ styles.card }>
                  <OptionsCard key={ i } infos={ option } />
                </section>))}
            </section>
        }

      </main>
    </div>
  );
}

export default Home;
