const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();
//cors
app.use(cors());

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db,{ 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false, 
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    // app.use(express.static(__dirname, 'client/build'));
    app.use(express.static(path.join(__dirname, './client/build')));

    app.get('*', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        res.sendFile(path.join(__dirname + './client/build/index.html'));
    });
}

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));