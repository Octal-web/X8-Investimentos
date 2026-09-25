const images = import.meta.glob('../assets/img/brands/*.png', { eager: true, query: '?url', import: 'default' });
export const brandImage = (slug) => images[`../assets/img/brands/${slug}.png`];
export const homeBrands = [
    ['nutrire', 'Nutrire'], ['birbo', 'Birbo'], ['monello', 'Monello'], ['mustache', 'Mr. Mustache'], ['sofia', 'Sofia'],
    ['unicasa', 'Unicasa'], ['casa-brasileira', 'Casa Brasileira'], ['new', 'New'], ['dell-anno', "Dell Anno"], ['rometal', 'Rometal'],
    ['sangue-de-boi', 'Sangue de Boi'], ['reservado', 'Marcus James Reservado'], ['conde', 'Conde de Foucauld'], ['wine', 'Wine South America'], ['pizzato', 'Pizzato'],
    ['rbs', 'Grupo RBS'], ['sicredi', 'Sicredi'], ['bortolini', 'Bortolini'], ['las-doscientas', 'Las Doscientas'], ['masilva', 'M. A. Silva'],
    ['euro-company', 'Euro Company'], ['silvestrin', 'Silvestrin'], ['aguia-inox', 'Águia Inox'],
].map(([slug, name]) => ({ name, image: brandImage(slug) }));
