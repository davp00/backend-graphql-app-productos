export default `

    type Contact {
        address     : String
        phone       : String
        country     : String
        city        : String
    }

    type Account {
        creation_date   : String
        last_update     : String
        token           : String
        recovery_token  : String 
    }

    type User {
        id          : ID!
        email       : String!
        pass        : String!
        name        : String!
        lastName    : String!
        contact     : Contact
        account     : Account
    }


    input UserInput {
        email       : String!
        pass        : String!
        name        : String!
        lastName    : String!
    }

    type Query {
        Login(email: String!, pass: String!): User
        PasswordRecovery( email: String! ): Response
    }

    type Mutation {
        CreateUser( user: UserInput! ): Boolean
        UpdateUser: User
    }

`