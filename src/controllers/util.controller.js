const UtilController = {};


export const getInsensibleString = ( string ) =>
{
    return new RegExp( [string].join(''), 'i');
}
