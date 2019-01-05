import {model, Schema} from 'mongoose';

const UserSchema = new Schema({
    email       : { type: String , required: true, unique: true},
    pass        : { type: String , required: true },


    profile     : {
        name        : { type: String , required: true },
        lastName    : { type: String , required: true },
        image       : { type: String, default: null }
    },


    contact     : {
        address : { type: String },
        phone   : { type: String },
        country : { type: String },
        city    : { type: String }
    },

    account     : {
        type            : { type: Number,   default: 1 },
        code            : { type: Number,   required: false },
        creation_date   : { type: Date ,    default: Date.now() },
        last_update     : { type: Date ,    default: Date.now() },
        token           : { type: String,   default: undefined },
        recovery_token  : { type: String ,  default: "" },
        deleted_at      : { type: Date ,    default: null },
    }
});


const UserModel = model( 'users' , UserSchema );

export default UserModel;