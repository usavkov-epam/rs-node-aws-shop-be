import products from '../../product-service/swagger';
import importSwagger from '../../import-service/swagger';

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

  servers : [ {
    url : "https://t554pox8g5.execute-api.eu-west-1.amazonaws.com/{basePath}",
    variables : {
      basePath : {
        default : ""
      }
    }
  } ],

  tags: [
    ...products.tags,
    ...importSwagger.tags,
  ],

  paths: {
    ...products.paths,
    ...importSwagger.paths,
  },

  "x-amazon-apigateway-cors" : {
    "allowMethods" : [ "GET", "POST" ],
    "allowHeaders" : [ "authorization", "content-type" ],
    "maxAge" : 0,
    "allowCredentials" : false,
    "allowOrigins" : [ "https://dys3ug6jzmiuj.cloudfront.net" ]
  },
  "x-amazon-apigateway-importexport-version" : "1.0"
};      
