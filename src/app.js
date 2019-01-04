import express  from 'express';
import { port } from '../config';
import path     from 'path';
import mongoose from './database';
import cors     from 'cors';

import TokenController from './controllers/jwt.controller';

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
    app.use( cors() );

    app.use( ( req, res, next) => TokenController.Auth( req, res , next))
//

// ROUTES
    app.use( '/graphql',graphqlHTTP( ( req, res, next) => {
        return {
            schema,
            graphiql    : true,
            context     : {
                Models,
                User: req.user
            } 
        }
    }));
//

// SERVER
    app.listen( port , () => console.log('Server running on port', port));
//
