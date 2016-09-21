const express = require( "express" );
const { json } = require( "body-parser" );


const app = express();
const port = 4000;

app.use( json() );


//database
const videogames = [
  {
    title: "Dirty Bomb"
    , platform: "PC"
    , rating: 4
    , _id: 0
    , sayRating () { return `${ this.rating } out of 5`; }
  }
  , {
    title: "Rainbow Six: Siege"
    , platform: "PC"
    , rating: 3
    , _id: 1
    , sayRating () { return `${ this.rating } out of 5`; }
  }
  , {
    title: "Butt City IV"
    , platform: "PC"
    , rating: 2
    , _id: 2
    , sayRating () { return `${ this.rating } out of 5`; }
  }
  , {
    title: "Battleborn"
    , platform: "PC"
    , rating: 5
    , _id: 3
    , sayRating () { return `${ this.rating } out of 5`; }
  }
];

//videogames array of objects

app.get( "/api/videogames", ( req, res ) => {
  return res.json( videogames );
} );

app.post( "/api/videogames", ( req, res ) => {
  req.body.videogame._id = videogames.length;
  req.body.videogame.sayRating = function () {
    return `${ this.title } received a ${ this.rating } out of 5`
  };
  videogames.push( req.body.videogame );
  console.log( videogames[ videogames.length - 1 ].sayRating() );
  return res.json( videogames );
} );

app.put( "/api/videogames", ( req, res ) => {
  for ( let i = 0; i < videogames.length; i++ ) {
    if ( req.body.title === videogames[i].title ) {
        videogames[i].rating = req.body.newRating;
        return res.json( videogames );
    }
  }
  return res.status( 404 ).json( { "error": "That videogame isn't in our database" } );
} );




app.listen( port, () => {
  console.log( `Listening on port: ${ port }` );
} );
