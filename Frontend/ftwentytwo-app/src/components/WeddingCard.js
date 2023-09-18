/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../modules/WeddingCard.module.css';
import icon from '../assets/images/casamentos/wedding-icon.jpg';

function WeddingCard({ wedding }) {
  return (
    <Link
      className={ styles.link }
      to={ `/casamentos/detalhe/${wedding.id}` }
      state={ { job: wedding } }
    >
      <div className={ styles.container }>
        <section className={ styles.card }>
          <h2>{`${wedding.noiva} & ${wedding.noivo}`}</h2>
          <p>{wedding.data}</p>
          <img
            src={ wedding.imagem === null || wedding.imagem === undefined
              ? icon
              : require(`../assets/images/casamentos/${wedding.id}.jpg`) }
            alt="Imagem do casamento"
            width="100%"
          />
        </section>
      </div>
    </Link>

  );
}

WeddingCard.propTypes = {
  wedding: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    noiva: PropTypes.string.isRequired,
    noivo: PropTypes.string.isRequired,
    imagem: PropTypes.string,
  }).isRequired,
};

export default WeddingCard;
