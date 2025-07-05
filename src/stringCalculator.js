import { NegativeNumberError, InvalidInputStringError } from "./errors.js";

let addCalledCount = 0

function add( numbers )
{
        //increment the called count
        addCalledCount++;

        // sum for empty string is 0
        if ( numbers === '' ) return 0;

        //define regex for supported default delimiters
        const defaultDelimiter = /,|\n/g

        //define regex for the syntax of the custom delimiter declaration
        const customDelimiterSyntax = /\/\/(.+)\n(.+)/

        // set the delimiter to be used for splitting to default delimiter initially
        let delimiterTobeUsed = defaultDelimiter

        // Check if the numbers string matches the custom delimiter syntax
        const customDelimiterSyntaxMatch = numbers.match( customDelimiterSyntax )

        // if it does match the custom delimiter syntax update the delimiter to be used and remove the delimiter declaration part from the numbers string
        if ( customDelimiterSyntaxMatch )
        {
                //get the custom delimiter declaration
                let customDelimiterDeclaration = customDelimiterSyntaxMatch[ 1 ]

                //Set the numbers string to its substring which has delimiter declaration part removed
                numbers = customDelimiterSyntaxMatch[ 2 ]

                //if delimiter declaration is a single char use it as the delimiter
                if ( customDelimiterDeclaration.length == 1 )
                {
                        delimiterTobeUsed = customDelimiterDeclaration
                }
                // else collect all the delimiters from the declaration
                else
                {
                        // extract all delimiters from the brackets []
                        let customDelimiters = customDelimiterDeclaration.match( /\[(.+?)\]/g ).map( delimiter => delimiter.slice( 1, -1 ) )

                        //escape the special regex characters which are part of the delimiters
                        customDelimiters = customDelimiters.map( d =>
                                d.replace( /[-[\]/{}()*+?.\\^$|]/g, '\\$&' )
                        );

                        //Set the delimiter to be used to the custom delimiter
                        delimiterTobeUsed = new RegExp( customDelimiters.join( '|' ), 'g' );
                }
        }

        // split all the numbers in the string using delimiter
        const inputStringParts = numbers.split( delimiterTobeUsed )

        //parse each number string to convert it to a number
        const parsedNumbers = []

        // array to store the invalid parts of input string which can not be parsed as numbers
        const invalidParts = []

        // for each part in input string: if it is a valid number parse it and store it in parsed numbers else store that part as invalid part
        inputStringParts.forEach( ( part ) =>
        {
                // regex for a number
                const numberRegex = /^[+-]?\d+$/

                //if current part is not a number store it in invalid parts array otherwise parse it
                if ( !part.match( numberRegex ) )
                        invalidParts.push( part )
                else
                {
                        //parse the number
                        const parsedNumber = parseInt( part )

                        //if it is <= 1000 then store it in the array otherwise ignore it
                        if ( parsedNumber <= 1000 )
                                parsedNumbers.push( parsedNumber )
                }
        } )

        //if there is any invalid part in the input string throw an error
        if ( invalidParts.length > 0 ) throw new InvalidInputStringError( invalidParts )

        //array to store all the negative numbers
        const negativeNumbers = []

        //variable to store the answer sum
        let sum = 0;

        //for each number: if non-negative, add to the sum else push to the negative number array
        parsedNumbers.forEach( number =>
        {
                number >= 0 ? sum += number : negativeNumbers.push( number )
        } );

        //if input string has any negative numbers throw an exception
        if ( negativeNumbers.length > 0 ) throw new NegativeNumberError( negativeNumbers )

        // sum all the parsed numbers
        return parsedNumbers.reduce( ( sum, number ) => sum += number, 0 )
}

function getCalledCount()
{
        return addCalledCount
}

export { add, getCalledCount }