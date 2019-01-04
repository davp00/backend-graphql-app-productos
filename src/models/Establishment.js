import { model, Schema } from 'mongoose';
import ClientSchema from './Schemas/Client';
import ProductSchema  from './Schemas/Product.schema';


const EstablishmentSchema = new Schema({

    type        : { type: Number, default: 1 } ,
    owner       : { type: String, required: true} ,
    verified    : { type: Boolean, default: false},


    workers     : { type: Array, default: [] },
    
    products    : [ ProductSchema ],

    clients     : [ ClientSchema ],

});



const EstModel = model( 'establishments' , EstablishmentSchema );


export default EstModel;