/* eslint-disable global-require */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../modules/WeddingCard.module.css';

function WeddingCard({ wedding }) {
  // eslint-disable-next-line import/no-dynamic-require
  const img = require(`../assets/images/casamentos/${wedding.noiva}_${wedding.noivo}.jpg`);
  return (
    <Link className={ styles.link } to={ `/casamentos/detalhe/${wedding.id}` }>
      <div className={ styles.card }>
        <section>
          <h2>{`${wedding.noiva} & ${wedding.noivo}`}</h2>
          <p>{wedding.data}</p>
          <img
            src={ img }
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
    imagem: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeddingCard;
