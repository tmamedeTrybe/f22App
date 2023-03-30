import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../modules/WeddingCard.module.css';
import img from '../assets/images/casamentos/Salua_Tiago.jpg';

function WeddingCard({ wedding }) {
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
