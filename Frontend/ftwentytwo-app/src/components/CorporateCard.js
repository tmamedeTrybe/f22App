/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../assets/images/corporativo/corporate-icon.jpg';
import styles from '../modules/FamilyCard.module.css';

function CorporateCard({ corporate }) {
  return (
    <Link
      className={ styles.link }
      to={ `/corporativo/detalhe/${corporate.id}` }
      state={ { job: corporate } }
    >
      <div className={ styles.container }>
        <section className={ styles.card }>
          <h2>{ corporate.empresa }</h2>
          <p>{ corporate.evento }</p>
          <p>{ corporate.data }</p>
          <img
            alt="Imagem do evento"
            src={ corporate.imagem === null || corporate.imagem === undefined
              ? icon
              : require(`../assets/images/corporativo/${corporate.id}.jpg`) }
          />
        </section>
      </div>
    </Link>
  );
}

CorporateCard.propTypes = {
  corporate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.string.isRequired,
    empresa: PropTypes.string.isRequired,
    evento: PropTypes.string.isRequired,
    imagem: PropTypes.string,
  }).isRequired,
};

export default CorporateCard;
