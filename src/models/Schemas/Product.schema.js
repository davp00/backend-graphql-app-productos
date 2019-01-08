import { Schema } from 'mongoose';

const { Types } = Schema;

const ProductSchema = new Schema({
    
    name        : { type: String, required: true },
    image       : { type: String, required: false, default: null},
    tags        : { type: Array, required: false, default: [] },
    category    : { type: Number, required: true },
    countable   : { type: Boolean, required: false, default: true},

    amount      : { type: Number, required: false, default: undefined },
    price       : { type: Number , required: false, default: undefined },

    information : {
        by          : String,
        created_at  : { type: Date, default: Date.now(), required: false },
        deleted_at  : { type: Date, default: undefined, required: false },
        added_at    : { type: Date, default: undefined, required: false },
    }

},
{
    versionKey: false 
});

export default ProductSchema;
