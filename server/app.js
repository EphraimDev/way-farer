import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import router from './route';

const app = express();

app.use(morganLogger('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());
app.use('/api/v1', router);

const port = process.env.PORT || 4000;

// Swagger definition
const swaggerDefinition = {
    info: {
      title: 'REST API for Way Farer App', // Title of the documentation
      version: '1.0.0', // Version of the app
      description: 'This is the REST API for my product', // short description of the app
    },
    host: `localhost:${port}`, // the host or url of the app
    basePath: '/api/v1', // the basepath of your endpoint
  };
  
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./docs/**/*.yaml'],
  };
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);
  
  // use swagger-Ui-express for your app documentation endpoint
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;