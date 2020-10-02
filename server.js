const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const fileHandler = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// secure express app with helmet
app.use(helmet());
app.use(helmet({
    contentSecurityPolicy: false,
  }));

// include body-parser to allow access to req.body object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get method that retrieves API data when user clicks search button
app.get('/get/:info', (req, res) => {
    const mediaSearch = req.params.info.split(',');
    const search = mediaSearch[0];
    const media = mediaSearch[1];
    fetch(`https://itunes.apple.com/search?term=${search}&media=${media}`)
        .then(apiRes => apiRes.json())
        .then(response => {
            res.send(response.results[0]) 
         })
})

// allow Express to serve resources built from React app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
// post request that adds music data to favorits.json file
app.post('/postmusic', (req, res) => {
    fileHandler.readFile('favorites.json', (err, data) => {
        if (err) throw err;
        // parse data to javascript array
        // to allow for addition of more data
        const arr = JSON.parse(data);
        arr.push({
            albumArt: req.body.albumArt,
            artistName: req.body.artistName,
            songName: req.body.songName,
            releaseDate: req.body.releaseDate
        });
        const updatedData = JSON.stringify(arr);
        fileHandler.writeFile('favorites.json', updatedData, (err) => {
            if (err) throw err;
            res.send('OK')
        })
    })

});

// post request that adds music data to favorits.json file
app.post('/postbooks', (req, res) => {
    fileHandler.readFile('favorites.json', (err, data) => {
        if (err) throw err;
        // parse data to javascript array
        // to allow for addition of more data
        const arr = JSON.parse(data);
        arr.push({
            paperBack: req.body.paperBack,
            author: req.body.author,
            title: req.body.title,
            genres: req.body.genres,
            releaseDate: req.body.releaseDate
        });
        const updatedData = JSON.stringify(arr);
        fileHandler.writeFile('favorites.json', updatedData, (err) => {
            if (err) throw err;

            res.send('OK')
        })
    })

});

// get request that provides data in favorites.json file when called
app.get('/get', (req, res) => {
    fileHandler.readFile('favorites.json', (err, data) => {
        if (err) res.send('File Not found');
        else
            res.send(`${data}`);
    })
})

// deletes specified item
app.delete('/delete', (req, res) => {
    fileHandler.readFile('favorites.json', (err, data) => {
        if (err) throw err;
        // parse data to javascript array for manipulation
        const arr = JSON.parse(data);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].title === req.body.itemName || arr[i].songName === req.body.itemName) {
                arr.splice(i, 1);
                const updatedData = JSON.stringify(arr);
                fileHandler.writeFile('favorites.json', updatedData, (err) => {
                    if (err) throw err;
                    res.send('deleted')
                });
            }
        }
    })
});

// port cofiguration
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`listening at port ${PORT}`)