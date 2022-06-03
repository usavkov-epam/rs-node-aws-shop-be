import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import swaggerDocument from './src/swaggerDocument';

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
