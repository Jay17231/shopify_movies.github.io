var express = require('express'),
    request = require('request');
req_prom = require('request-promise');
app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
// Home Page
app.get('/', (req, res) => {
    res.render('home');
});

//Search results page
app.get('/movies-list', (req, res) => {
    var searchElement = 'https://www.omdbapi.com/?s=' + req.query.movie + '&apikey=231d212d';
    var movieDetails = [];
    var results;
    req_prom(searchElement)
        .then((body) => {
            results = JSON.parse(body);
            if (results['Response'] == 'True') {
                for (let i = 0; i < results['Search'].length; i++) {
                    req_prom('https://www.omdbapi.com/?i=' + results['Search'][i]['imdbID'] + '&apikey=231d212d')
                        .then(data => {
                            movieDetails.push(JSON.parse(data));
                            if (movieDetails.length === results['Search'].length) {
                                res.render('movies-list', { results: results, keyword: req.query.movie, movieDetails: movieDetails });
                            }
                        })
                }
            } else {
                res.render('movies-list', { results: results, keyword: req.query.movie, movieDetails: movieDetails });
            }
        })
        .catch((err) => {
            try {
                var displayError = JSON.parse(err['error']);
                console.log(displayError['Error']);
                res.render('movies-list', { results: { 'Response': 'False', 'Error': displayError['Error'] }, keyword: req.query.movie });
            } catch {
                console.log('Something went wrong');
            }
        });

});

app.listen(5000, () => console.log('Server listening on port: ', 5000));

module.exports = app;