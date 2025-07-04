
function add( numbers )
{
        // sum for empty string is 0
        if ( numbers === '' ) return 0;

        //define regex for supported default delimiters
        const defaultDelimiter = /,|\n/g

        //define regex for the syntax of the custom delimiter declaration
        const customDelimiterSyntax = /\/\/(.)\n(.+)/

        // set the delimiter to be used for splitting to default delimiter initially
        let delimiterTobeUsed = defaultDelimiter

        // Check if the numbers string matches the custom delimiter syntax
        const customDelimiterSyntaxMatch = numbers.match( customDelimiterSyntax )

        // if it does match the custom delimiter syntax update the delimiter to be used and remove the delimiter declaration part from the numbers string
        if ( customDelimiterSyntaxMatch )
        {
                //Set the delimiter to be used to the custom delimiter
                delimiterTobeUsed = customDelimiterSyntaxMatch[ 1 ]

                //Set the numbers string to its substring which has delimiter declaration part removed
                numbers = customDelimiterSyntaxMatch[ 2 ]
        }

        // split all the numbers in the string using delimiter and parse each of them to convert to a number
        const parsedNumbers = numbers.split( delimiterTobeUsed ).map( ( num ) => parseInt( num ) )

        // sum all the parsed numbers
        return parsedNumbers.reduce( ( sum, number ) => sum += number, 0 )
}

export default add