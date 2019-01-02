import { model, Schema } from 'mongoose';
import ClientSchema from './Schemas/Client';


const EstablishmentSchema = new Schema({

    type        : { type: Number, default: 1 } ,
    owner       : { type: String, required: true} ,
    verified    : { type: Boolean, default: false},


    workers     : { type: Array, default: [] },
    products    : [
        {
            price       : { type: Number, required: true },
            _idProduct  : { type: String, required: true }
        }
    ],

    clients     : [ ClientSchema ],

    

});



const EstModel = model( 'establishments' , EstablishmentSchema );


export default EstModel;