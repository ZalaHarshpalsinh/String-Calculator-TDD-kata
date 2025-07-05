import readline from 'readline';
import { add } from "./src/stringCalculator.js"

// create the readline interface
const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
} );

// Print the welcom message and instructions
console.log( '---------------------------$$ Welcome to the String Calculator! $$---------------------------\n' );
console.log( '-------------------| Instructions |-------------------' )
console.log( 'Enter a string of numbers to add (e.g. "1,2,3", "1\\n2,3" or "//;\\n1;2")' );
console.log( 'Paste input and then type "done" in a new line to terminate the input when done.' );
console.log( '--------------------------------------------------\n' )

// prompt for input
console.log( 'Enter input : ' );

//variable to store input string
let input = '';

//scan multiline input
rl.on( 'line', ( line ) =>
{
        //if line is 'done' terminate the input state
        if ( line.trim().toLowerCase() === 'done' )
        {
                //try to calculate the result and print it
                try
                {
                        const result = add( input.trim() );
                        console.log( `✅ Result: ${result}` );
                } catch ( err )
                {
                        //if error occured print the error message 
                        console.error( `❌ Error: ${err.message}` );
                }
                finally
                {
                        //finally close the readline resource
                        rl.close();
                }
        }
        else
        {
                //else add the line to the input along with newline character 
                input += line + '\n';
        }
} );