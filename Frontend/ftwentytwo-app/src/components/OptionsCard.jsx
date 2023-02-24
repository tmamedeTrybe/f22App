import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../modules/OptionsCard.module.css';

function OptionsCard({ infos }) {
  const { nameCard, image, path } = infos;
  return (
    <Link className={ styles.container } to={ path }>
      <h1>{ nameCard }</h1>
      <img src={ image } alt="Imagem de um evento" />
    </Link>
  );
}

OptionsCard.propTypes = {
  infos: PropTypes.shape({
    nameCard: PropTypes.string,
    image: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

export default OptionsCard;
