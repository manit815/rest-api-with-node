const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDB} = require('./db/mongo');
const {insertAd, getAds, deleteAd, updateAd} = require('./db/ads');

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

app.post('/', async (req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({message: 'new ad inserted'});
});

app.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id);
    res.send({message: 'ad removed'});
});

app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({message: 'ad updated'});
});

startDB().then(async () => {
    await insertAd({title: 'hello, from in-memory db!'});

    app.listen(3001, async () => {
        console.log('server running at port 3001');
    })
})
