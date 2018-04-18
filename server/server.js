const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info('Server is listening on port: ' + PORT + '!');
    }
});