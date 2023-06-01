import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import styles from '../modules/Initial.module.css';

function Initial() {
  return (
    <div className={ styles.container }>
      <section className={ styles.logo }>
        <Link to="/login">
          <Logo size="250px" />
        </Link>
      </section>
    </div>
  );
}

export default Initial;
