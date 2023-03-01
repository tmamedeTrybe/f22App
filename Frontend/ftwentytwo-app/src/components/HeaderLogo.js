import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import styles from '../modules/Header.module.css';

function Header({ title }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={ styles.header }>
      <Logo />
      <h1>{title}</h1>
      <h1>
        {`Olá ${user.name}`}
      </h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
