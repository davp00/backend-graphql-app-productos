import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email       : { type: String , required: true },
    pass        : { type: String , required: true },
    name        : { type: String , required: true },
    lastName    : { type: String , required: true },

    contact     : {
        address : { type: String },
        phone   : { type: String },
        country : { type: String },
        city    : { type: String }
    },

    account     : {
        creation_date   : { type: Date , default: Date.now() },
        last_update     : { type: Date , default: Date.now() },
        token           : { type: String, default: undefined },
        recovery_token  : { type: String , default: "" },
        deleted_at      : { type: Date , default: null },
    }
});


const UserModel = mongoose.model( 'users' , UserSchema );

export default UserModel;