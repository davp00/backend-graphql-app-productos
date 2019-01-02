import { model , Schema } from 'mongoose';

const { Types } = Schema;

export const ProductSchema = new Schema({
    
    name        : { type: String, required: true },
    image       : { type: String, required: false, default: null},
    tags        : { type: Array, required: false, default: [] },
    category    : { type: Number, required: false },

    amount      : { type: Number, required: false, default: undefined },
    price       : { type: Types.Decimal128 , required: false, default: undefined },

    information : {
        by          : String,
        created_at  : { type: Date, default: Date.now() },
        deleted_at  : { type: Date, default: undefined}
    }

});


const ProductModel = model( 'products' , ProductSchema );

export default ProductModel;