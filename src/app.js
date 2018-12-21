import express  from 'express';
import { port }   from '../config';
import mongoose from './database';

// GRAPHQL
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

const app   = express();


// MIDDLEWARES

    app.use( express.json() );

//

// ROUTES

//

// SERVER
    app.listen( port , () => console.log('Server running on port', port));
//
