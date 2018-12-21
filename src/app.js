import express  from 'express';
import { port } from '../config';
import path     from 'path';
import mongoose from './database';


// GRAPHQL
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

// MODELOS
import Models from './models/context';

const app   = express();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// MIDDLEWARES

    app.use( express.json() );

//

// ROUTES
    app.use( '/', graphqlHTTP({
        schema,
        graphiql    : true,
        context     : {
            Models
        } 
    }));
//

// SERVER
    app.listen( port , () => console.log('Server running on port', port));
//
