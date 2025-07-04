class NegativeNumberError extends Error
{
        constructor( negativeNumbers )
        {

                const message = `negative numbers not allowed ${negativeNumbers.join( ',' )}`;
                super( message );
                this.name = 'NegativeNumberError';
                this.negativeNumbers = negativeNumbers;
        }
}

class InvalidInputStringError extends Error
{
        constructor( invalidParts )
        {
                invalidParts = invalidParts.map( ( part ) => part === '' ? '(empty string i.e "")' : part )
                const message = `input string is not in any of the valid formats, problem at [${invalidParts.join( ' , ' )}]`;
                super( message );
                this.name = 'InvalidInputStringError';
                this.invalidParts = invalidParts;
        }
}

export { NegativeNumberError, InvalidInputStringError }