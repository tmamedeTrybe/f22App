import OptionsCard from '../components/OptionsCard';
import options from '../assets/options';
import styles from '../modules/Home.module.css';
import HeaderLogo from '../components/HeaderLogo';

function Home() {
  return (

    <div className={ styles.body }>
      <HeaderLogo title="Home" />
      <main className={ styles.main }>
        <section className={ styles.cards }>
          { options.map((option, i) => (
            <section key={ i } className={ styles.card }>
              <OptionsCard key={ i } infos={ option } />
            </section>))}
        </section>
      </main>
    </div>
  );
}

export default Home;
