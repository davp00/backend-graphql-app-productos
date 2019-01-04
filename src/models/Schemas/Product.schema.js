import { Schema } from 'mongoose';

const { Types } = Schema;

const ProductSchema = new Schema({
    
    name        : { type: String, required: true },
    image       : { type: String, required: false, default: null},
    tags        : { type: Array, required: false, default: [] },
    category    : { type: Number, required: true },
    countable   : { type: Boolean, required: false, default: true},

    amount      : { type: Number, required: false, default: undefined },
    price       : { type: Types.Decimal128 , required: false, default: undefined },

    information : {
        by          : String,
        created_at  : { type: Date, default: Date.now() },
        deleted_at  : { type: Date, default: undefined}
    }

});

export default ProductSchema;
