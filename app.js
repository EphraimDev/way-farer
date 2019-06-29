import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';

import router from './server/route';

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

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;