import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from './Logo';
import styles from '../modules/Header.module.css';
import MyContext from '../context/myContext';

function Header({ title }) {
  const { user } = useContext(MyContext);

  return (
    <div className={ styles.header }>
      <Logo size="150px" />
      <Link to="/home">Início</Link>
      <h2>
        {`Olá ${user}`}
      </h2>
      <h1>{title}</h1>
      <hr width="180" color="rgb(252, 255, 252)" />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
