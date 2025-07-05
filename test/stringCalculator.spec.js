import { add, getCalledCount } from "../src/stringCalculator.js"
import { NegativeNumberError, InvalidInputStringError } from "../src/errors.js";


describe( 'Sanity checks', () =>
{
        test( 'Jest is working', () =>
        {
                expect( 1 ).toBe( 1 );
        } );
} );

describe( 'getCalledCount method tests', () =>
{
        test( 'Returns the correct count of add() method being called', () =>
        {
                expect( getCalledCount() ).toBe( 0 )
                add( '' )
                expect( getCalledCount() ).toBe( 1 )
                add( '1,2' )
                expect( getCalledCount() ).toBe( 2 )
                add( '//&\n1&2&3' )
                expect( getCalledCount() ).toBe( 3 )
        } )
} )


describe( 'add method tests', () =>
{
        test( 'Returns 0 as sum for an empty string ', () =>
        {
                expect( add( '' ) ).toBe( 0 )
        } )

        test( 'Returns the number itself if input string contains only one number', () =>
        {
                expect( add( '100' ) ).toBe( 100 )
        } )

        test( 'Returns the correct sum if input string contains two comma-separated numbers', () =>
        {
                expect( add( '10,20' ) ).toBe( 30 )
        } )

        test( 'Returns the correct sum if input string contains multiple comma-separated numbers', () =>
        {
                expect( add( '1,2,3,4,5' ) ).toBe( 15 )
        } )

        test( 'Handles the newline between numbers as a delimiter', () =>
        {
                expect( add( '1\n2,3\n4,5' ) ).toBe( 15 )
        } )

        test( 'Handles the use of custom delimiter specified at the start of string', () =>
        {
                expect( add( '//;\n1;2;3;4;5' ) ).toBe( 15 );
        } )

        test( 'Throws a correct corresponding error if input string contains negative numbers', () =>
        {
                expect( () => add( '//$\n1$-2$3$-4$5' ) ).toThrow( new NegativeNumberError( [ -2, -4 ] ) )
        } )

        test( 'Throws a correct corresponding error if input string is not in valid format', () =>
        {
                expect( () => add( 'abcd' ) ).toThrow( new InvalidInputStringError( [ 'abcd' ] ) )
                expect( () => add( '10,a,' ) ).toThrow( new InvalidInputStringError( [ 'a', '' ] ) )
                expect( () => add( '///;\n\n1;2;3' ) ).toThrow( new InvalidInputStringError( [ '///;', '', '1;2;3' ] ) )
        } )

        test( 'Numbers bigger than 1000 are ignored', () =>
        {
                expect( add( '1,1001,2' ) ).toBe( 3 )
        } )

        test( 'Handles custom delimiters of length more than 1', () =>
        {
                expect( add( '//[***]\n1***2***3' ) ).toBe( 6 )
        } )

        test( 'Handles multiple custom delimiters', () =>
        {
                expect( add( '//[**][&]\n1**2&3' ) ).toBe( 6 )
        } )

        test( 'Handles multiple custom delimiters of length more than 1', () =>
        {
                expect( add( '//[***][^^^]\n1***2^^^3' ) ).toBe( 6 )
        } )
} )
