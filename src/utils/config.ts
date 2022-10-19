import segnaposto from '../assets/img/segnaposto.jpeg';
import {CardItemType} from '../components/Card/SimpleCard';

export const routes: MyRoute[] = [
  {
    path: '/',
    label: 'Home',
  },
  {path: '/categorie', label: 'Esplora'},
  {
    label: 'Categorie',
    submenu: [
      {path: '/categorie/categoria-1', label: 'Categoria 1'},
      {path: '/categorie/categoria-2', label: 'Categoria 2'},
      {path: '/categorie/categoria-3', label: 'Categoria 3'},
      {path: '/categorie/categoria-4', label: 'Categoria 1'},
    ],
  },
];

export const categoryOptions: {value: Category; label: string}[] = [
  {
    value: 'categoria-1',
    label: 'Categoria 1',
  },
  {value: 'categoria-2', label: 'Categoria 2'},
  {value: 'categoria-3', label: 'Categoria 3'},
  {value: 'categoria-4', label: 'Categoria 4'},
];

export const cityOptions: {value: City; label: string}[] = [
  {
    value: 'roma',
    label: 'Roma',
  },
  {value: 'milano', label: 'Milano'},
  {value: 'napoli', label: 'Napoli'},
];

export const visibilityOptions: VisibilityOption[] = [
  {
    value: 'offerta-1',
    title: '1 x 1',
    subtitle: '1 risalita al giorno per 1 giorno',
    price: {
      actual: '1,00$',
    },
  },
  {
    value: 'offerta-2',
    title: '1 x 3',
    subtitle: '1 risalita al giorno per 3 giorni',
    price: {
      actual: '2,70$',
      original: '3,00$',
    },
    chip: '-10%',
  },
  {
    value: 'offerta-3',
    title: '1 x 7',
    subtitle: '1 risalita al giorno per 7 giorni',
    chip: '-20%',
    price: {
      actual: '5,50$',
      original: '7,00$',
    },
  },
  {
    value: 'offerta-4',
    title: '1 x 15',
    subtitle: '1 risalita al giorno per 15 giorni',
    chip: '-30%',
    price: {
      actual: '11,50$',
      original: '15,00$',
    },
  },
  {
    value: 'offerta-5',
    title: '1 x 30',
    subtitle: '1 risalita al giorno per 30 giorni',
    chip: '-50%',
    price: {
      actual: '15,00$',
      original: '30,00$',
    },
    important: true,
  },
];

export const timeRangeOptions: {value: TimeRange; label: string}[] = [
  {
    value: 'timerange-1',
    label: '05:00 - 17:00',
  },
  {value: 'timerange-2', label: '17:00 - 05:00'},
];

export const categoryCards: CardItemType[] = [
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Categoria 1',
    button: {
      caption: 'Scopri di più',
      path: '/categorie/categoria-1',
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 1034,
  },
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Categoria 2',
    button: {
      caption: 'Scopri di più',
      path: '/categorie/categoria-2',
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 884,
  },
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Categoria 3',
    button: {
      caption: 'Scopri di più',
      path: '/categorie/categoria-3',
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 239,
  },
  {
    img: {
      src: segnaposto.src,
      alt: 'segnaposto',
    },

    title: 'Categoria 4',
    button: {
      caption: 'Scopri di più',
      path: '/categorie/categoria-4',
      icon: 'ArrowForwardIos',
      variant: 'contained',
    },
    totalAds: 587,
  },
];
