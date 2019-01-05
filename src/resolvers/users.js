import bcrypt   from 'bcrypt';
import TokenController from '../controllers/jwt.controller';
import MailController from '../controllers/mail.controller';
import Response from '../classes/Response'; 
import { getInsensibleString } from '../controllers/util.controller';

const saltRounds = 10;

// Querys

    const Login = async (parent, args, { Models }) => 
    {
        const user = await Models.UserModel.findOne( { email: getInsensibleString( args.email ) } );

        if ( user )
        {
            if ( bcrypt.compareSync( args.pass , user.pass ))
            {
                user.account.token = TokenController.Create({
                    _id     : user._id,
                },60,'days');
                await user.save();
                return user;
            }
        }

        return null;
    }


    const PasswordRecovery = async ( parent, args, { Models } ) => 
    {
        const user = await Models.UserModel.findOne({ email: getInsensibleString( args.email ) });

        if ( user )
        {
            try {
                user.account.recovery_token = TokenController.Create({
                    _id: user._id
                },
                1, 'days');

                await user.save();

                MailController.SendMail(
                    user.email, 
                    'Recuperar contraseña', 
                    0,
                    {
                        link:`${'www.link.com'}/recovery/${ user.account.recovery_token }`,
                        clientName: `${ user.name } ${ user.lastName }`,
                    }
                );
                
                return new Response(200, true);
            }catch (erro) 
            {
                return new Response(403, false);
            }

        }else 
            return new Response(410, false);
    }

///


// Mutations

    const CreateUser = async ( parent, args, { Models } ) => 
    {
        try{
            const { UserModel }     = Models;
            const lastUser          = await UserModel.findOne().sort({_id: -1}).limit(1);
            const user              = new UserModel(args.user);

            user.pass           = await bcrypt.hash(user.pass, saltRounds);
            user.account.code   = (lastUser && lastUser.account.code)? lastUser.account.code + 1 : 1 ;

            await user.save();

            return new Response(1, true);
        }catch(e)
        {
            console.error( e );
            return new Response(2, false);
        }
    }

    const UpdateUser = ( parent, args, { Models } ) => 
    {
        return null;
    }

///


export default {
    Query: {
        PasswordRecovery,
    },
    Mutation: {
        CreateUser,
        UpdateUser,
        Login
    }
}