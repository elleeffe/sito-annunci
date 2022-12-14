import segnaposto from '../assets/img/segnaposto.jpeg';

export const mockUser: User = {
  email: 'lorenzo@faenzi.com',
  phone: '3428743873',
  id: 'user-1',
};

export const mockAds: Ads = {
  views: 24,
  id: 'annuncio-mock-1',
  publicationDate: Date.now(),
  title:
    'Titolo annuncio molto lungo, sicuramente finirà su due righe nella pagina dei dettagli sicuramente finirà su due righe nella pagina dei dettagli',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  category: 'categoria-1',
  age: '45',
  city: 'roma',
  neighborhood: 'Tor sapienza',
  areas: ['La Rustica', 'Tor cervara', 'Collatina', 'Tor Tre Teste'],
  email: 'lorenzo@email.com',
  phone: '3423757625',
  whatsapp: true,
  cover: [
    {
      name: 'banner-pilot.jpeg',
      base64: segnaposto.src,
    },
  ],
  images: [
    {
      name: 'banner01.jpg',
      base64: segnaposto.src,
    },
    {
      name: 'background@2x.png',
      base64: segnaposto.src,
    },
  ],
  visibilityOption: 'offerta-1',
  visibilityTime: 'timerange-1',
  visibilityExpiration: Date.now() + 300000000,
  isFavorite: true,
};
