import cardCasamentos from './images/cardCasamentos.jpg';
import cardFamilia from './images/cardFamilia.jpg';
import cardGastronomia from './images/cardGastronomia.jpg';

const opcoes = [
  {
    id: 1,
    nameCard: 'Casamentos',
    // eslint-disable-next-line max-len
    image: cardCasamentos,
    path: '/casamentos',
  },
  {
    id: 2,
    nameCard: 'Família',
    image: cardFamilia,
    path: '/familia',
  },
  {
    id: 3,
    nameCard: 'Gastronomia',
    image: cardGastronomia,
    path: '/gastronomia',
  },

];

export default opcoes;
