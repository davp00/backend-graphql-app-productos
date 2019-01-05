import Response from '../classes/Response';

// Mutations
    const CreateEstablishment = async (parent, args, { Models, User }) => 
    {
        try {
            const { EstModel }  = Models;
            const est           = new EstModel( args.est );
            
            est.owner   = User._id;

            await est.save();
         
            return new Response(1, true);
        }catch( e )
        {
            return new Response(1, false);
        }
    };


// Querys

    const getStablishments = async ( parent, args, { Models, User } ) =>
    {
        return await Models.EstModel.find({ 
            $or:[ { owner: User._id } , { workers: User._id } ] 
        });
    };

export default {
    Mutation: {
        CreateEstablishment
    },

    Query: {
        getStablishments
    },

    Establishment: {
        owner   : ( obj , args, { Models } ) => Models.UserModel.findById( obj.owner ),
        workers : ( obj , args, { Models } ) => Models.UserModel.find( { _id: { $in: obj.workers } } ),
    }
}