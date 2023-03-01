import OptionsCard from '../components/OptionsCard';
import options from '../assets/options';
import styles from '../modules/Home.module.css';
import HeaderLogo from '../components/HeaderLogo';

function Home() {
  return (

    <div className={ styles.container }>
      <HeaderLogo title="Casamentos" />
      <main className={ styles.main }>

        { options.map((option, i) => (
          <section key={ i } className={ styles.card }>
            <OptionsCard key={ i } infos={ option } />
          </section>))}

      </main>
    </div>
  );
}

export default Home;
