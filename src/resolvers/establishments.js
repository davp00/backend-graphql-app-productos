import Response from '../classes/Response';

// Mutations
    const CreateEstablishment = async (parent, args, { Models, User }) => 
    {
        try {
            const { EstModel }      = Models;
            const lasEst            = await EstModel.findOne().sort({_id: -1}).limit(1);
            const est               = new EstModel( args.est );
            
            est.owner   = User._id;
            est.code    = ( lasEst )? lasEst.code + 1 : 1; 

            await est.save();
         
            return new Response(1, true);
        }catch( e )
        {
            return new Response(1, false);
        }
    };


    const addProduct = async ( parent, args, { Models } ) => 
    {
        const { ProductModel, EstModel }    = Models;
        const { item }                      = args;

        const product = await ProductModel.findById( item.idProduct );

        try {
            product.amount                  = item.amount;
            product.information             = { added_at: new Date() };
            product.price                   = item.price;
            
            await EstModel.updateOne( {code : item.estCode }, {
               $push: {
                   products: {
                     $each : [ product ],
                     $sort : { name: 1 }
                   },
               } 
            });

            return new Response(1, true);
        }catch( e ) 
        {
            console.error( e );
            return new Response(2, false);
        }
    };


// Querys

    const getStablishments = async ( parent, args, { Models, User } ) =>
    {
        return await Models.EstModel.find({ 
            $or:[ { owner: User._id } , { workers: User._id } ] 
        });
    };

    const getStablishment = async ( parent, args, { Models, User } ) =>
    {
        const est = Models.EstModel.findOne({ code: args.code });
        return est;
    }

export default {
    Mutation: {
        CreateEstablishment,
        addProduct
    },

    Query: {
        getStablishments,
        getStablishment
    },

    Establishment: {
        owner   : ( obj , args, { Models } ) => Models.UserModel.findById( obj.owner ),
        workers : ( obj , args, { Models } ) => Models.UserModel.find( { _id: { $in: obj.workers } } ),
    }
}