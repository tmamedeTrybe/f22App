/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../assets/images/familia/family-icon.jpg';
import styles from '../modules/FamilyCard.module.css';

function FamilyCard({ family }) {
  return (
    <Link className={ styles.link } to={ `/familia/detalhe/${family.id}` }>
      <div className={ styles.container }>
        <section className={ styles.card }>
          <h2>{ family.categoria }</h2>
          <p>{ family.nome }</p>
          <p>{ family.data }</p>
          <img
            alt="Imagem do evento"
            src={ family.imagem === null || family.imagem === undefined
              ? icon
              : require(`../assets/images/casamentos/${family.id}.jpg`) }
          />
        </section>
      </div>
    </Link>
  );
}

FamilyCard.propTypes = {
  family: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    imagem: PropTypes.string,
  }).isRequired,
};

export default FamilyCard;
