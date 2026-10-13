const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT, password TEXT)");
    db.run("INSERT INTO users VALUES (1, 'admin', 'SuperSecretAdminPassword123!')");
    db.run("INSERT INTO users VALUES (2, 'john_doe', 'password123')");
    db.run("INSERT INTO users VALUES (3, 'sarah_c', 'matrix2026')");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    console.log(`[Executing Query]: ${query}`);

    db.all(query, (err, rows) => {
        if (err) {
            return res.json({
                success: false,
                message: `Database Error: ${err.message}`,
                query: query
            });
        }

        if (rows && rows.length > 0) {
            res.json({
                success: true,
                user: rows[0].username,
                query: query
            });
        } else {
            res.json({
                success: false,
                message: 'Invalid username or password.',
                query: query
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`[+] SQLi Lab running at: http://localhost:${PORT}`);
});