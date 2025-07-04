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

export { NegativeNumberError }