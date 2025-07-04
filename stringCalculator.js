
function add( numbers )
{
        // sum for empty string is 0
        if ( numbers === '' ) return 0;

        //define regex for supported default delimiters
        const delimiter = /,|\n/g

        // split all the numbers in the string using delimiter and parse each of them to convert to a number
        const parsedNumbers = numbers.split( delimiter ).map( ( num ) => parseInt( num ) )

        // sum all the parsed numbers
        return parsedNumbers.reduce( ( sum, number ) => sum += number )
}

export default add