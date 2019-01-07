import { model, Schema } from 'mongoose';
import ClientSchema from './Schemas/Client';
import ProductSchema  from './Schemas/Product.schema';


const EstablishmentSchema = new Schema({

    name        : { type: String, required: true},
    type        : { type: Number, default: 1 } ,
    owner       : { type: String, required: true } ,
    image       : { type: String, required: false, default: null},
    verified    : { type: Boolean, default: false},
    code        : { type: Number, required: false, index: true },

    workers     : { type: Array, default: [String] },
    
    products    : [ ProductSchema ],

    clients     : [ ClientSchema ],

});


EstablishmentSchema.index({ code: 1 });


const EstModel = model( 'establishments' , EstablishmentSchema );


export default EstModel;