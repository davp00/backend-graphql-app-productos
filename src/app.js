import express  from 'express';
import { port } from '../config';
import path     from 'path';
import mongoose from './database';
import cors     from 'cors';


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

//

// ROUTES
    app.use( '/graphql', graphqlHTTP({
        schema,
        graphiql    : true,
        context     : {
            Models
        } 
    }));

    /*
    app.set('view engine', 'hbs');
    app.use ('/public', express.static( path.join(__dirname, 'public') ) );
    app.set('views', path.join(__dirname, 'public'));
    app.use( '/mail', (req , res) => 
    {
        res.render('mail/passwordrecovery.hbs', {
            link:'www.prueba2.com',
            clientName: 'Daniel'
        });
    });*/
//

// SERVER
    app.listen( port , () => console.log('Server running on port', port));
//
