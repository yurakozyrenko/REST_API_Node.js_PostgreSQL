const client = require('./connection');
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server start');
});

client.connect();

app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
    client.end;
});

app.get('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    client.query(
        `SELECT * FROM users where user_id = ${user_id}`,
        (err, result) => {
            if (!err) {
                res.send(result.rows);
            } else {
                console.log(err.message);
            }
        }
    );
    client.end;
});

app.post('/users', (req, res) => {
    const { user_id, username, age, gender } = req.body;
    let insertQuery = `INSERT INTO users(user_id, username, age, gender) VALUES (${user_id} , '${username}' , ${age}, '${gender}') `;
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insert ok');
        } else {
            console.log(err.message);
        }
    });
    client.end;
});

app.put('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    const { username } = req.body;
    let updateQuery = `UPDATE users set username = '${username}' where user_id = ${user_id}`;
    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update ok');
        } else {
            console.log(err.message);
        }
    });
    client.end;
});

app.delete('/users/:user_id', (req, res) => {
    const { user_id } = req.params;
    let updateQuery = `DELETE FROM users where user_id = ${user_id}`;
    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Delete ok');
        } else {
            console.log(err.message);
        }
    });
    client.end;
});
