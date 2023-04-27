import cardCasamentos from './images/cardCasamentos.jpg';
import cardFamilia from './images/cardFamilia.jpg';
import cardGastronomia from './images/cardGastronomia.jpg';
import cardHds from './images/cardHds.jpg';
import cardCorporativo from './images/cardCorporativo.jpg';

const opcoes = [
  {
    id: 1,
    nameCard: 'Casamentos',
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
  {
    id: 4,
    nameCard: 'Corporativo',
    image: cardCorporativo,
    path: '/corporativo',
  },
  {
    id: 5,
    nameCard: 'Hds',
    image: cardHds,
    path: '/hds',
  },
];

export default opcoes;
