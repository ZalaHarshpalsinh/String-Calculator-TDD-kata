# String Calculator TDD Kata

> In this read me file, I am going include everything I learnt and did while solving this TDD exercise, I will try to explain everything in brief to the best of my ability and as per my understanding of the TDD.

---

## 📘 What is TDD and more importantly why adapt TDD

> TDD stands for Test Driven Development, and it is a Software development philosophy in which during each step we first define our requirements and specifications and write the code for testing whether our production code matches those specifications, and if it does not then only we go ahead and add the most minimum amount of code or do the minimum amount of refactoring to make our code meet those specifications and pass the test.We repeat this process until we have implemented and tested all the required features.

<img alt="Red-Green-Refactor cycle" width=600 height=300 src="https://www.qodo.ai/wp-content/uploads/2024/12/image-244-1024x666.png">

> To summerize, as we write the tests first, during development of the production code our only or the biggest motivation or the goal is to make the failing tests pass. Hence it is called "Test Driven" development.

> If you want to know more about TDD, this [article](https://www.freecodecamp.org/news/an-introduction-to-test-driven-development-c4de6dce5c/) on the **freeCodeCamp** website is a great choice and it is where I started while doing this exercise.

---

I also watched this [video](https://www.youtube.com/watch?v=qkblc5WRn-U&t=7s) by **Robert Martin** in which he explains the TDD with the help of **3 rules** which are:

> 1.  You are not allowed to write any production code unless it is to make a failing unit test pass.
> 2.  You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
> 3.  You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

These rules seem counter intuative at first but as he explains each of them and their benefits as a collective whole you start to see the bigger picture.
I do recommend watching the video as he also talks about some other interesting stuff such as static type checking and dynamic type checking towards the end of the video in the QnA section, but if you don't want to,here is what I have summerized from it.

> -   If you adapt TDD, you would be spending less time debugging your code since you are making changes in small units and hence they are easier to debug.

> -   Since our test suit will include a test for each functionality of the system, they indirectly act as examples of how to use each functionality so it is easier to create the documentation.

> -   We write tests first and then write minimum code to make those tests pass, this process insures that the function which is created is highly testable and highly decoupled from the rest of the system

> -   At the end of TDD, we produce a test suite which if the code passes, we can be 100% sure that it is deployable.

> -   Since we are making changes in small units and alreay have the test suit ready, it is easier to refactor the bad code.

> -   TDD allows developers to create solutions in increments instead of planning everything in advance while making sure the code meets all the specifications.

---

Then I watched this [video](https://www.youtube.com/watch?v=Jv2uxzhPFl4) by **Fireship IO** from where I learnt about a very common TDD practice, which is **Red-Green-Refactor**.

> 1.  **Red** – Write a failing test.
> 2.  **Green** – Write the minimum code necessary to pass the test.
> 3.  **Refactor** – Improve the code structure without changing its behavior.

<img alt="Red-Green-Refactor cycle" width=600 height=300 src="https://nascenia.com/wp-content/uploads/2016/01/Pic_28.jpg">

---

# Now that we have basic knowledge of TDD, lets start the String calculator exercise

## 🧮 The String Calculator TDD Kata

### Problem Statement

> Create a function `add(numbers: string): number` which returns the sum of comma-separated numbers. The input string may also contain newlines, or use a custom delimiter, and must throw an exception when negatives are encountered.

### ⚙️ TDD Approach

> To write tests **I am using Jest which is a All-in-one testing package** for Javascript codebase.

> We approach the problem using the **Red-Green-Refactor** cycle step-by-step:

---

### 🔧 Step 0: Add a sanity check to make sure jest is working correctly

-   **Feature**: (None)
-   **Test Written**:

```
describe( 'Sanity checks', () =>
{
        test( 'Jest is working', () =>
        {
                expect( 1 ).toBe( 1 );
        } );
} );
```

-   **Passing Test Screenshot**:

    ![Passing Test](https://res.cloudinary.com/dvcnfady1/image/upload/v1751656991/TDD%20kata/pass-0_jzvibw.png)

We have verified that Jest is working properly through this trivial test.

---

### 🔧 Step 1: Empty String Returns 0

-   **Feature**: Return 0 when given an empty string

-   **Test Written**:

```js
describe("add method tests", () => {
    test("Returns 0 as sum for an empty string ", () => {
        expect(add("")).toBe(0);
    });
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751656991/TDD%20kata/fail-1_vtmu24.png)

-   **Refactored Code**:

```js
function add(numbers) {
    // sum for empty string is 0
    if (numbers === "") return 0;
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751656991/TDD%20kata/pass-1_komtua.png)

---

### 🔧 Step 2: Single Number Returns Itself

-   **Feature**: Return the number if only one number is passed

-   **Test Written**:

```js
test("Returns the number itself if input string contains only one number", () => {
    expect(add("100")).toBe(100);
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](https://res.cloudinary.com/dvcnfady1/image/upload/v1751658175/TDD%20kata/fail-2_ym9nzm.png)

-   **Refactored Code**:

```js
function add(numbers) {
    if (numbers === "") return 0;
    return parseInt(numbers);
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751658175/TDD%20kata/pass-2_x4ljwt.png)

---

### 🔧 Step 3: Two Numbers Comma-Separated

-   **Feature**: Add two comma-separated numbers

-   **Test Written**:

```js
test("Returns the correct sum if input string contains two comma-separated numbers", () => {
    expect(add("10,20")).toBe(30);
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751658474/TDD%20kata/fail-3_q0lshb.png)

-   **Refactored Code**:

```js
function add(numbers) {
    // sum for empty string is 0
    if (numbers === "") return 0;

    // parse all the numbers in the string
    const parsedNumbers = numbers.split(",").map((num) => parseInt(num));

    // sum all the parsed numbers
    return parsedNumbers.reduce((sum, number) => (sum += number));
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751658474/TDD%20kata/pass-3_ykd140.png)

---

### 🔧 Step 4: Any Number of Inputs

-   **Feature**: Add any number of comma-separated numbers

-   **Test Written**:

```js
test("Returns the correct sum if input string contains multiple comma-separated numbers", () => {
    expect(add("1,2,3,4,5")).toBe(15);
});
```

-   Test already passes

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751658474/TDD%20kata/pass-3_ykd140.png)

---

### 🔧 Step 5: Handle Newline as Delimiter

-   **Feature**: Newline can be used as a delimiter along with comas

-   **Test Written**:

```js
test("Handles the newline between numbers as a delimiter", () => {
    expect(add("1\n2,3\n4,5")).toBe(15);
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751659057/TDD%20kata/fail-5_rqdvbj.png)

-   **Refactored Code**:

```js
function add(numbers) {
    // sum for empty string is 0
    if (numbers === "") return 0;

    //define regex for supported default delimiters
    const delimiter = /,|\n/g;

    // split all the numbers in the string using delimiter and parse each of them to convert to a number
    const parsedNumbers = numbers.split(delimiter).map((num) => parseInt(num));

    // sum all the parsed numbers
    return parsedNumbers.reduce((sum, number) => (sum += number));
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751659056/TDD%20kata/pass-5_wmptrf.png)

---

### 🔧 Step 6: Custom Delimiters

-   **Feature**: Any character can be used as a delimiter provided that it is mentioned at the beginning of string with specified input syntax.

-   **Test Written**:

```js
test("Handles the use of custom delimiter specified at the start of string", () => {
    expect(add("//;\n1;2;3;4;5")).toBe(15);
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751659429/TDD%20kata/fail-6_no8ypf.png)

-   **Refactored Code**:

```js
function add(numbers) {
    // sum for empty string is 0
    if (numbers === "") return 0;

    //define regex for supported default delimiters
    const defaultDelimiter = /,|\n/g;

    //define regex for the syntax of the custom delimiter declaration
    const customDelimiterSyntax = /\/\/(.)\n(.+)/;

    // set the delimiter to be used for splitting to default delimiter initially
    let delimiterTobeUsed = defaultDelimiter;

    // Check if the numbers string matches the custom delimiter syntax
    const customDelimiterSyntaxMatch = numbers.match(customDelimiterSyntax);

    // if it does match the custom delimiter syntax update the delimiter to be used and remove the delimiter declaration part from the numbers string
    if (customDelimiterSyntaxMatch) {
        //Set the delimiter to be used to the custom delimiter
        delimiterTobeUsed = customDelimiterSyntaxMatch[1];

        //Set the numbers string to its substring which has delimiter declaration part removed
        numbers = customDelimiterSyntaxMatch[2];
    }

    // split all the numbers in the string using delimiter and parse each of them to convert to a number
    const parsedNumbers = numbers
        .split(delimiterTobeUsed)
        .map((num) => parseInt(num));

    // sum all the parsed numbers
    return parsedNumbers.reduce((sum, number) => (sum += number), 0);
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751659429/TDD%20kata/pass-6_yis0ap.png)

---

## Before we proceed with furthor steps, for the sake of readability and consistancy lets go ahead and create custom error classes for the errors which our function might want to throw

### ❗ Custom Error Class for Negative Numbers

To provide a better error message when negative numbers are passed, we created a custom error class:

#### 🔹 `NegativeNumberError`

```js
class NegativeNumberError extends Error {
    constructor(negativeNumbers) {
        const message = `negative numbers not allowed ${negativeNumbers.join(
            ","
        )}`;
        super(message);
        this.name = "NegativeNumberError";
        this.negativeNumbers = negativeNumbers;
    }
}
```

### ❗ Custom Error Class for invalid input string

To provide a better error message when input string is invalid, we created a custom error class:

#### 🔹 `InvalidInputStringError`

```js
class InvalidInputStringError extends Error {
    constructor(invalidParts) {
        invalidParts = invalidParts.map((part) =>
            part === "" ? '(empty string i.e "")' : part
        );
        const message = `input string is not in any of the valid formats, problem at [${invalidParts.join(
            " , "
        )}]`;
        super(message);
        this.name = "InvalidInputStringError";
        this.invalidParts = invalidParts;
    }
}
```

We will use these classes in the function code as well as the tests we will write next.

---

### 🔧 Step 7: Throw error on Negatives numbers

-   **Feature**: Throws `NegativeNumberError` when input string contains any negative numbers

-   **Test Written**:

```js
test("Throws a correct corresponding error if input string contains negative numbers", () => {
    expect(() => add("//$\n1$-2$3$-4$5")).toThrow(
        new NegativeNumberError([-2, -4])
    );
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751660284/TDD%20kata/fail-7_wc0l8e.png)

-   **Refactored Code**:

```js
function add(numbers) {
    // sum for empty string is 0
    if (numbers === "") return 0;

    //define regex for supported default delimiters
    const defaultDelimiter = /,|\n/g;

    //define regex for the syntax of the custom delimiter declaration
    const customDelimiterSyntax = /\/\/(.)\n(.+)/;

    // set the delimiter to be used for splitting to default delimiter initially
    let delimiterTobeUsed = defaultDelimiter;

    // Check if the numbers string matches the custom delimiter syntax
    const customDelimiterSyntaxMatch = numbers.match(customDelimiterSyntax);

    // if it does match the custom delimiter syntax update the delimiter to be used and remove the delimiter declaration part from the numbers string
    if (customDelimiterSyntaxMatch) {
        //Set the delimiter to be used to the custom delimiter
        delimiterTobeUsed = customDelimiterSyntaxMatch[1];

        //Set the numbers string to its substring which has delimiter declaration part removed
        numbers = customDelimiterSyntaxMatch[2];
    }

    // split all the numbers in the string using delimiter and parse each of them to convert to a number
    const parsedNumbers = numbers
        .split(delimiterTobeUsed)
        .map((num) => parseInt(num));

    //array to store all the negative numbers
    const negativeNumbers = [];

    //variable to store the answer sum
    let sum = 0;

    //for each number: if non-negative, add to the sum else push to the negative number array
    parsedNumbers.forEach((number) => {
        number >= 0 ? (sum += number) : negativeNumbers.push(number);
    });

    //if input string has any negative numbers throw an exception
    if (negativeNumbers.length > 0)
        throw new NegativeNumberError(negativeNumbers);

    // sum all the parsed numbers
    return parsedNumbers.reduce((sum, number) => (sum += number), 0);
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751660283/TDD%20kata/pass-7_i0h8rj.png)

---

### 🔧 Step 8: Throw error on invalid input string

-   **Feature**: Throws `InvalidInputStringError` when input string is invalid and can't be parsed.

-   **Test Written**:

```js
test("Throws a correct corresponding error if input string is not in valid format", () => {
    expect(() => add("abcd")).toThrow(new InvalidInputStringError(["abcd"]));
    expect(() => add("10,a,")).toThrow(new InvalidInputStringError(["a", ""]));
    expect(() => add("///;\n\n1;2;3")).toThrow(
        new InvalidInputStringError(["///;", "", "1;2;3"])
    );
});
```

-   **Failing Test Screenshot**:

    ![Failing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751660728/TDD%20kata/fail-8_fpiqmn.png)

-   **Refactored Code**:

```js
function add(numbers) {
    // sum for empty string is 0
    if (numbers === "") return 0;

    //define regex for supported default delimiters
    const defaultDelimiter = /,|\n/g;

    //define regex for the syntax of the custom delimiter declaration
    const customDelimiterSyntax = /\/\/(.)\n(.+)/;

    // set the delimiter to be used for splitting to default delimiter initially
    let delimiterTobeUsed = defaultDelimiter;

    // Check if the numbers string matches the custom delimiter syntax
    const customDelimiterSyntaxMatch = numbers.match(customDelimiterSyntax);

    // if it does match the custom delimiter syntax update the delimiter to be used and remove the delimiter declaration part from the numbers string
    if (customDelimiterSyntaxMatch) {
        //Set the delimiter to be used to the custom delimiter
        delimiterTobeUsed = customDelimiterSyntaxMatch[1];

        //Set the numbers string to its substring which has delimiter declaration part removed
        numbers = customDelimiterSyntaxMatch[2];
    }

    // split all the numbers in the string using delimiter
    const inputStringParts = numbers.split(delimiterTobeUsed);

    //parse each number string to convert it to a number
    const parsedNumbers = [];

    // array to store the invalid parts of input string which can not be parsed as numbers
    const invalidParts = [];

    // for each part in input string: if it is a valid number parse it and store it in parsed numbers else store that part as invalid part
    inputStringParts.forEach((part) => {
        if (!part.match(/^[+-]?\d+$/)) invalidParts.push(part);
        else parsedNumbers.push(parseInt(part));
    });

    //if there is any invalid part in the input string throw an error
    if (invalidParts.length > 0)
        throw new InvalidInputStringError(invalidParts);

    //array to store all the negative numbers
    const negativeNumbers = [];

    //variable to store the answer sum
    let sum = 0;

    //for each number: if non-negative, add to the sum else push to the negative number array
    parsedNumbers.forEach((number) => {
        number >= 0 ? (sum += number) : negativeNumbers.push(number);
    });

    //if input string has any negative numbers throw an exception
    if (negativeNumbers.length > 0)
        throw new NegativeNumberError(negativeNumbers);

    // sum all the parsed numbers
    return parsedNumbers.reduce((sum, number) => (sum += number), 0);
}
```

-   **Passing Test Screenshot**:

    ![Passing Test](http://res.cloudinary.com/dvcnfady1/image/upload/v1751660727/TDD%20kata/pass-8_x1284b.png)

---

## 💻 CLI Program: Interact With Your Calculator

> In addition to the TDD exercise I have created a CLI based program `consoleApp.js` to use our string calculator `add()` method through terminal, you can check its code in the repository.

### 🏁 How to Run

```bash
node consoleApp.js
```

> You will be greeted with the welcome message and some instructions on inputing the string.

### 📝 Input Format

-   You can type multi-line inputs
-   End your input with the word `done`

### Example:

```
Enter input:
1
2,3
done
```

✅ Result: 6

### 📸 CLI Screenshot

![CLI Tool Screenshot](http://res.cloudinary.com/dvcnfady1/image/upload/v1751661241/TDD%20kata/consoleApp-1_hhkhzd.png)

---

## If you have made it this far, thanks for reading through this exercise 😄!

## I had fun building this and applying real-world TDD practices step-by-step 🪜.

## I would also like to thank Incubyte for choosing this learning based task for the campus placement test round, I really learned a lot while also having fun ☺️.

## Peace out! 👋
