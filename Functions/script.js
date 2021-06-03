'use strict';

//// DEFAULT PARAMETERS ////

const bookings = [];

const createBooking = function (
  flightNum,
  numPassegers = 2,
  price = 300 * numPassegers
) {
  // Old method for default parameters:
  // numPassegers = numPassegers || 2;
  // price = price || 300*numPassegers;
  const booking = { flightNum, numPassegers, price };
  console.log(booking);
  bookings.push(booking);
};

createBooking('vn333', 24, 234);
createBooking('VN222', undefined, 400);
console.log(bookings);

//////  HIGHER ORDER FUNCTION     ///////////

// Below are two function will be called back as argument
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Using HIGHER ORDER function and call above functions:
const transfromStr = function (str, func) {
  console.log(str);
  console.log(`String after transformed: ${func(str)}`);
  console.log(`Callback function used: ${func.name}`);
};

// Calling function and pass callback function as argument:
transfromStr('I love JS so much!', oneWord);
// Love JS so much!
// script.js:37 String after transformed: ilovejssomuch!
// script.js:38 Callback function used: oneWord
transfromStr('JavaScript is wonderful!', upperFirstWord);
// JavaScript is wonderful!
// script.js:37 String after transformed: JAVASCRIPT is wonderful!
// script.js:38 Callback function used: upperFirstWord

//// FUNCTION RETURNS A FUNCTION /////
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// asign a function to a variable
const greetHey = greet('Hey'); // greetHey is now a function

// call greetHey once again:
greetHey('Tim');
greetHey('Vuong');

// Or call the greet() function directly
greet('Hello')('Vuong Huynh');

const chao = loiChao => ten => console.log(`${loiChao} ${ten}`);
chao('Chao')('Vuong');

const xinChao = chao(`Xin Chao`);
xinChao('Kathy');

/////////////////////////////////
/* CALL() and APPLY() methods */

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(249, 'Tim Huynh');
lufthansa.book(235, 'Kathy Huynh');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// If we call the book() function directly, it won't work
// book(23, 'Cindy'); // not work

/* USING call() method for function */
book.call(eurowings, 23, 'Cindy');
console.log(eurowings.bookings);

book.call(lufthansa, 234, 'Tim Huynh');
console.log(lufthansa.bookings);

/* USING apply() method */
const flightData = [539, 'Kevin Huynh'];
book.apply(lufthansa, flightData);
console.log(lufthansa.bookings);

// -->> Using call() method with spead notation:
book.call(lufthansa, ...flightData);
console.log(lufthansa.bookings);

/* BIND() method return a function */
// bind method will bind a function to an object
const bookEW = book.bind(eurowings);
console.log(eurowings); // eurowings object will not have any own function
bookEW(234, 'Kevin Huynh');
console.log(eurowings.bookings);

// We can go further with bind()  method
const bookEW233 = book.bind(eurowings, 233); // 233 is flight number
bookEW233('Tim Huynh');

/* With Event Listenser */
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // similar to below function
// const addVAT = value => value + value * .23
console.log(addVAT(200));

/* Rewrite the addTAX above as a higher order function */
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTax2(0.23);
console.log(addVAT2(200)); // Same result as above.

/** Challenge */

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n{Write the option number!}`))
    // Using short circuit instead of if statement
    typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
    
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type='array') {
    if (type === 'array') {
      console.log(this.answers)
    } else if (type === 'string') {
      console.log(`The poll results are ${this.answers.join(', ')}`)
    }
  }
};
// poll.registerNewAnswer();

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// GOOD LUCK 😀

// Using call() method to manually add an object into the function
const display = poll.displayResults;
const obj = {answers: [5, 2, 3]}

display.call(obj)
display.call({answers: [1, 5, 3, 9, 6, 1]})
display.call({answers: [1, 5, 3, 9, 6, 1]}, 'string')
