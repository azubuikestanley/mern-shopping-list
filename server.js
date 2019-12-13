const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
//cors
app.use(cors());

//Bodyparser Middleware
app.use(express.json());

//DB Config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
    .connect(db,{ 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false, 
        useUnifiedTopology: true
    })//Adding new mongo url parser
    .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));