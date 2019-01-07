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
        CreateEstablishment
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