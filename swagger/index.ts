import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import swaggerDocument from './src/swaggerDocument';

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log('Server for swagger started on port 3000. Open http://localhost:3000/api/swagger to see it.');
});
