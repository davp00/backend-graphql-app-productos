import { model } from 'mongoose';
import ProductSchema from './Schemas/Product.schema';


const ProductModel = model( 'products' , ProductSchema );

export default ProductModel;