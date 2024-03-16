const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const cors = require('cors'); 
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Scylla"
    });
});

app.use('/api', api);

app.listen(port, () => {
    console.log(`You are listening to http://localhost:${port}`);
});
