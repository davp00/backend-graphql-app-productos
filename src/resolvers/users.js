import bcrypt   from 'bcrypt';
import TokenController from '../controllers/jwt.controller';
import MailController from '../controllers/mail.controller';
import Response from '../classes/Response'; 

const saltRounds = 10;

// Querys

    const Login = async (parent, args, { Models }) => 
    {
        const user = await Models.UserModel.findOne( { email: args.email } );

        if ( user )
        {
            if ( bcrypt.compareSync( args.pass , user.pass ))
            {
                user.account.token = TokenController.Create({
                    _id     : user._id,
                    email   : user.email,
                    name    : user.name,
                    lastName: user.lastName
                },2,'days');
                await user.save();
                return user;
            }
        }

        return null;
    }


    const PasswordRecovery = async ( parent, args, { Models } ) => 
    {
        const user = await Models.UserModel.findOne({ email: args.email });

        if ( user )
        {
            try {

                MailController.SendMail(user.email, 
                    'Password Recovery', 
                    'Para recuperar contraseña ingrese al siguiente enlace ...');

                user.account.recovery_token = TokenController.Create({
                    _id: user._id
                },
                1, 'days');

                await user.save();
                
                return new Response('Hemos enviado un correo a su cuenta para que pueda recuperar su contraseña', true);
            }catch (erro) 
            {
                return new Response('Ha ocurrido un error al enviar el correo', false);
            }

        }else 
            return new Response('No existe ningun usuario con este correo', false);
    }

///


// Mutations

    const CreateUser = async ( parent, args, { Models } ) => 
    {
        const { UserModel } = Models;
        const user = new UserModel(args.user);
        user.pass = await bcrypt.hash(user.pass, saltRounds);
        await user.save();
        return true;
    }

    const UpdateUser = ( parent, args, { Models } ) => 
    {
        return null;
    }

///


export default {
    Query: {
        Login,
        PasswordRecovery
    },
    Mutation: {
        CreateUser,
        UpdateUser,
    }
}