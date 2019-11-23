const express = require('express');

const app = express();

app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@email.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@email.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('this is working');
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password) {
           res.json('success');
       } else {
           res.status(400).json('error logging in');
       }
    
});

app.listen(3000, () => {
    console.log('You are listenning to port 3000');
});