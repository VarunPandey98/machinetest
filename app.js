const express = require('express');
const app= express();
const router = express.Router();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Candidate = require('./models/Candidate');
var cors = require('cors')

server.listen('50080',()=>{console.log("The Server Started again")});

require('dotenv/config');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
}); 


app.use(bodyParser.json());
//Import routes
const postsRoute = require('./routes/posts'); 
app.use('/', postsRoute);                    

// Connect to Mongo DB
mongoose.connect(process.env.DB_CONNECTION2, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
    if (err) throw console.log(err);
    console.log("Yes Database connected");
    // db.close();
});
