import mongoose from 'mongoose';
import { URI }  from '../config';


mongoose.connect( URI, { useNewUrlParser: true } )
.then( (db) => console.log('Connected database'))
.catch( ( error ) => console.log( error ) );


export default mongoose;