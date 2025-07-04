
function add( numbers )
{
        // sum for empty string is 0
        if ( numbers === '' ) return 0;

        // parse all the numbers in the string
        const parsedNumbers = numbers.split( ',' ).map( ( num ) => parseInt( num ) )

        // sum all the parsed numbers
        return parsedNumbers.reduce( ( sum, number ) => sum += number )
}

export default add