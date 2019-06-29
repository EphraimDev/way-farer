import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import pool from './server/model/db';

const app = express();

app.use(morganLogger('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;