const UtilController = {};


export const getInsensibleString = ( string ) =>
{
    return new RegExp( [string].join(''), 'i');
}

const parseString = ( str ) => 
{
    return str.normalize('NFD')
            .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
            .normalize().toLowerCase();
}

export const filterComparator = ( str1 , str2 ) => 
{
    str1 = parseString( str1 );
    str2 = parseString( str2 );
    
    return str1.indexOf( str2 ) !== -1;
}
