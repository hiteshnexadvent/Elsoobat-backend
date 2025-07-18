const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const router = require('./routes/admin');
const { default: mongoose } = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

// --------------------------- session

app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    },
}))

// -------------------------- mongodb

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDb Connected'))
    .catch(() => console.log('Error while connecting MongoDb'))


app.use('/admin', router);

app.get('/', (req, res) => {
    res.render('adminLogin');
})


app.listen(process.env.PORT, () => {
    console.log('Server is running');
})