//nodemon index.js to run nodemon, which watches your node server for changes, and will then stop and restart your server to implement changes. Node does not update in real time, needs to be restarting to implement changes.

// Tells node to use express as a dependency. Make sure package.json knows express is a dependency, so a terminal cmd of 'node install' would install express so another person can run your code.
const express = require( "express" );
//
const { json } = require( "body-parser" );
// var express = require( "body-parser" ).json;
//

// express's main method that abstract's a lot of server setup.
const app = express();
const port = 4000;

app.use( json() ); //see line 6


const movies = [
    {
        title: "The English Patient"
        , rating: 1
        , _id: 0
    }
    , {
        title: "Baby Geniuses 2"
        , rating: -1
        , _id: 1
    }
    , {
        title: "Home Alone"
        , rating: 3.5
        , _id: 2
    }
    , {
        title: "The Shining"
        , rating: 4
        , _id: 3
    }
];

//everything after the port, is the path.
// Example: $http.get(  "localhost:8080/api/data" )
// /api/data is an endpoint.
// req = request from client, res = response from our server
// response.json is safer than response.send
// .json converts what you send to json
// .json is a method built in to the object that express() // gave us.
//

app.get( "/api/movies", ( req, res ) => {
  res.json( movies );
} );

app.post( "/api/movies", ( req, res ) => {
  req.body.movie._id = movies.length;
  console.log( req.body );
  movies.push( req.body.movie );
  res.json( movies );
  // res.json sends back updated data, this is a good habit to have.
} );

app.put( "/api/movies", ( req, res ) => {
  if ( movies[ req.body._id ] !== undefined && typeof req.body.newRating === 'number' ) {
    movies[ req.body._id ].rating = req.body.newRating;
    return res.status( 200 ).json( movies );
  }
  // return res.json s to avoid an error. Error has to do with not being able to respond more than once.
  return res.status( 404 ).json( { "error": "movie not found" } );
} );


//Star Wars API-esque example:
// Characters
// GET ALL - http://whateveryourdomainis.com/api/characters
// GET ONE - /api/characters/someId
// DELETE ONE - /api/characters/someId

//Which port to look for stuff. port = 4000. Port 80 is the internet's default, don't use that one until you're ready for live?
app.listen( port, () => {
  console.log( `Listening on port: ${ port }` );
} );
