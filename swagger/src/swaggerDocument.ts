import products from '../../product-service/swagger';

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Documentation',
    description: 'Open API 3.0.1 specification for the projects APIs',
    contact: {
      name: 'Yury Saukou',
      url: 'https://github.com/usavkov-epam'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },

  tags: [
    ...products.tags,
  ],

  paths: {
    ...products.paths,
  },
};      
