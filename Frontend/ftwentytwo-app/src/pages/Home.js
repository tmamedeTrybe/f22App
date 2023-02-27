import OptionsCard from '../components/OptionsCard';
import options from '../assets/options';
import styles from '../modules/Home.module.css';
import Logo from '../components/Logo';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={ styles.container }>
      <Logo />
      <h1>Home</h1>
      <header>
        <h1>
          {`Olá ${user.name}`}
        </h1>
      </header>
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
