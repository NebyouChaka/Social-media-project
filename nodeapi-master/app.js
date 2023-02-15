const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();







//  DATABASE_URL = mongodb;//localhost:27017/nodeapi
// SECRET = ASHDFKLAHSD2323
// e812i830LWgZdSge
// mongodb+srv://nebyouchaka:kukuloveme1984K@nodeapi.49fodbw.mongodb.net/test
// // mongodb://kaloraat:dhungel8@ds257054.mlab.com:57054/nodeapi
// // MONGO_URI= mongodb://localhost/nodeapi
 //mongodb+srv;//admin:<kukuloveme1984K@messenger.r6sgdqk.mongodb.net/test
// mongoose
   mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true
    })
    .then(() => console.log('Nebyou DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// apiDocs
app.get('/api', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware -
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});