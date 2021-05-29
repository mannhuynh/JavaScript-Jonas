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
