/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../assets/images/gastronomy/gastronomy-icon.jpg';
import styles from '../modules/FamilyCard.module.css';

function GastronomyCard({ gastronomy }) {
  return (
    <Link
      className={ styles.link }
      to={ `/gastronomia/detalhe/${gastronomy.id}` }
      state={ { job: gastronomy } }
    >
      <div className={ styles.container }>
        <section className={ styles.card }>
          <h2>{ gastronomy.empresa }</h2>
          <p>{ gastronomy.evento }</p>
          <p>{ gastronomy.data }</p>
          <img
            alt="Imagem do evento"
            src={
              gastronomy.imagem === null || gastronomy.imagem === undefined
                ? icon
                : require(`../assets/images/gastronomy/${gastronomy.id}.jpg`)
            }
          />
        </section>
      </div>
    </Link>
  );
}

GastronomyCard.propTypes = {
  gastronomy: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    empresa: PropTypes.string.isRequired,
    evento: PropTypes.string.isRequired,
    imagem: PropTypes.string,
  }).isRequired,
};

export default GastronomyCard;
