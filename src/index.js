const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDB} = require('./db/mongo');
const {insertAd, getAds} = require('./db/ads');

const app = express();

const ads = [{
    title: 'Hello, world again!',    
}]

//for API security
app.use(helmet());

//to parse JSON objects
app.use(bodyParser.json());

//to enable CORS
app.use(cors());

//for logging HTTP requests
app.use(morgan('combined'));

app.get('/', async (req,res) => {
    res.send(await getAds());
});

startDB().then(async () => {
    await insertAd({title: 'hello, from in-memory db!'});

    app.listen(3001, async () => {
        console.log('server running at port 3001');
    })
})
