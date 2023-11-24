import express from 'express';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', Router);
app.use(express.static('./client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running Successfully on PORT ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL= process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.vuypco8.mongodb.net/?retryWrites=true&w=majority`;

Connection(URL);