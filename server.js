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
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
       req.body.password === database.users[0].password) {
           res.json('success');
       } else {
           res.status(400).json('error logging in');
       }
    
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = database.users.filter(user => {
        if(user.id === id) {
            return user;
        }
    });
    if (user[0]) {
        res.json(user[0]);
    } else {
        res.status(404).json('No such user');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = database.users.filter(user => {
        if(user.id === id) {
            user.entries++;
            return user;
        }
    });
    if (user[0]) {
        res.json(user[0].entries);
    } else {
        res.status(404).json('No such user');
    }
})

app.listen(3000, () => {
    console.log('You are listenning to port 3000');
});