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
      to={ `/gastronomy/detail/${gastronomy.id}` }
      state={ { job: gastronomy } }
    >
      <div className={ styles.container }>
        <section className={ styles.card }>
          <h2>{ gastronomy.company }</h2>
          <p>{ gastronomy.event }</p>
          <p>{ gastronomy.date }</p>
          <img
            alt="Imagem do evento"
            src={
              gastronomy.image === null || gastronomy.image === undefined
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
    date: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default GastronomyCard;
