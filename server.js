const express = require('express');
//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
            client: 'pg',
            connection: {
            host : '127.0.0.1',
            user : 'mymac',
            password : '',
            database : 'smart-brain'
            }
        });

// db.select('*').from('users').then(data => {
//     console.log(data);
// })

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt, saltRounds)); //Advanced concept re, res is passed directly we don't need to pass it

app.post('/register', (req,res) => {
    register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
    image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);
})
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });

app.listen(process.env.PORT || 3000, () => {
    console.log('You are listenning to port ${process.env.PORT}');
});