// Mutations

const CreateProduct = async( parent, args, { Models }) => 
{
    const product = new Models.ProductModel( args.product );
    await product.save();
    return product;
};

const UpdateProduct = async ( parent, args, { Models }) => 
{
    try{
        await Models.ProductModel.findOneAndUpdate({_id: args.id}, { $set: args.product });
        return true;
    }catch( e )
    {
        return false;
    } 
};


// Querys
const AllProducts = ( parent, args, { Models }) => Models.ProductModel.find();

export default {
    
    Mutation: {
        CreateProduct,
        UpdateProduct
    },

    Query: {
        AllProducts
    }
}