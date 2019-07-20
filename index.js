const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//Array for value

genres = [
{id:1, name: 'Horror'},
{id:2, name: 'Comedy'},
{id:3, name: 'Action'},
{id:4, name: 'Romance'},
{id:5, name: 'Documentary'},
{id:6, name: 'Sci-Fi'},
{id:7, name: 'Crime'},
{id:8, name: 'Drama'},
{id:9, name: 'Adventure'},
{id:10, name: 'Thriller'}
];

//GET Request Handling
app.get('/', (req, res) => {
res.send("welcome to Vidly");
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
    });


    app.get('/api/genres/:id',  (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id));
        if(!genre) return res.status(404).send("genre not found");
    res.send(genre); 
    });


app.post('/api/genres', (req, res) => {

//validate the request
//if invalid, return 400
const { error } = validategenre(req.body); //eqivalent to getting result.error
if (error) return res.status(400).send(error.details[0].message);


const genre = {
id: genres.length+1, 
name: req.body.name
};

genres.push(genre);
res.send(genre); //By convention, send the newly added object back to client for reference.
});


app.put('/api/genres/:id', (req, res) => {
//look up the genre
//return 404 if genre doesn't exists
const genre = genres.find(c => c.id === parseInt(req.params.id));
        if(!genre) return res.status(404).send("genre not found");

//validate the request
//if invalid, return 400
const { error } = validategenre(req.body); //eqivalent to getting result.error
if (error) return res.status(400).send(error.details[0].message);


//update the genre 
genre.name = req.body.name;

//return the updated genre
res.send(genre);

});


app.delete('/api/genres/:id', (req, res) => {
//look up the genre
//return 404 if genre doesn't exists
const genre = genres.find(c => c.id === parseInt(req.params.id));
        if(!genre) return res.status(404).send("genre not found");

//Delete the genre using splice method
const index = genres.indexOf(genre);
genres.splice(index, 1);

res.send(genre);

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log(`Listening on port ${port}...`);
});

function validategenre(genre){

const schema = {
    name: Joi.string().min(3).required()
};    
return Joi.validate(genre, schema);//returns an object
}