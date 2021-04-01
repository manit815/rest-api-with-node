const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

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

app.get('/', (req,res) => {
    res.send(ads);
});

app.listen(3001, () => {
    console.log('server running at port 3001');
})

