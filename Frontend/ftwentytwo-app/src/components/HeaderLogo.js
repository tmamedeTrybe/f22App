import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import styles from '../modules/Header.module.css';
import MyContext from '../context/myContext';

function Header({ title }) {
  const { user } = useContext(MyContext);

  return (
    <div className={ styles.header }>
      <Logo />
      <h1>{title}</h1>
      <h1>
        {`Olá ${user}`}
      </h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
