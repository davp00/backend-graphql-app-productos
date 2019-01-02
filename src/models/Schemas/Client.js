import { Schema } from 'mongoose';


const ClientSchema = new Schema({
    
    name        : String,
    lastName    : String,
    phone       : String,
    nickName    : String,
    
});

export default ClientSchema;