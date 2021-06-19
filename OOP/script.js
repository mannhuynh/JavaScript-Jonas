'use strict';

/**
 * There are 3 options to create an 'blue print'
 * 1. Function Constructor
 * 2. ES6 Class
 * 3. Object.create()
 */

/**
 * 1. New object is created using new keyword
 * 2. Function is called this = {}, the objects instanciated
 * 3. The objects liked to prototype
 * 4. Function automatically return an object {}
 */

// ///////////////////////////////
// //// Function constructor /////
// const Person = function (firstName, lastName, birthYear) {
//   this.first = firstName;
//   this.last = lastName;
//   this.birthYear = birthYear;

//   //// Don't construct function in here
//   // this.calcAge = function () {
//   //   console.log(`${2050 - this.birthYear}`)
//   // }
// };

// // Instanciated => object is created using new keyword
// const vuong = new Person('Vuong', 'Huynh', '1990');

// // vuong is now an object with this.first = Vuong, this.last = Huynh, this.birthYear = 1990
// // console.log(vuong)

// // Prototypes: adding method in prototype
// Person.prototype.calcAge = function () {
//   console.log(`${2050 - this.birthYear}`);
// };

// // the object linked to prototype
// vuong.calcAge(); // 60

// // // check prototype: vuong is linked to Person's prototype
// // console.log(vuong.__proto__ == Person.prototype)  // true
// // console.log(Person.prototype.isPrototypeOf(vuong))  // true

// // Adding property in prototype
// Person.prototype.species = 'Homo Sapiens';

// // // species now is in object's prototype, not in object's constructure
// // console.log(vuong.hasOwnProperty('birthYear')); // true
// // console.log(vuong.hasOwnProperty('species')); // false

// // // but they can be called in the same way
// // console.log(vuong.birthYear, vuong.species)
// // console.log(vuong.__proto__)
// // console.log(Person.prototype.constructor)
// // console.dir(Person.prototype.constructor)
// // console.log(vuong.__proto__.constructor)
// // console.log(vuong.__proto__.__proto__)

// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   console.log((this.speed += 10));
// };
// Car.prototype.brake = function () {
//   console.log((this.speed -= 5));
// };

// // class Car {
// //   constructor(make, speed) {
// //     this.make = make;
// //     this.speed = speed;
// //   }
// //   accelerate() {
// //     console.log(this.speed += 10);
// //   }
// //   brake() {
// //     console.log(this.speed -= 5);
// //   }
// // }

// const bmw = new Car('BMW', 120);
// const mer = new Car('Mercedes', 95);
// // console.log(bmw, mer)
// // bmw.accelerate()
// // mer.accelerate()
// // mer.brake()
// // mer.accelerate()
// // mer.accelerate()

// //// Classes inherit classes ////
// const Person = function (fullName, birthYear) {
//   this.fullName = fullName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2050 - this.birthYear);
// };

// const Student = function (fullName, birthYear, course) {
//   // Inherit Person class
//   Person.call(this, fullName, birthYear);
//   this.course = course;
// };

// // Copy prototype of Person to Student first
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.instruct = function () {
//   console.log(`${this.fullName} is studying ${this.course}`);
// };

// const kevin = new Student('Kevin', 2000, 'CS');
// console.log(kevin);
// kevin.calcAge();
// kevin.instruct();

// kevin.sayhi = function () { console.log('Hi') }
// kevin.sayhi()
// console.log(kevin)
// console.log(kevin.__proto__ === Student.prototype)  // true
// console.log(Student.prototype)

// ///////////////////////////
// //// ES6 Class /////////////
// /**
//  * 1. Classes are not hoisted
//  * 2. Classes are first-class citizen
//  * 3. Classes are executed in strict mode
//  */

// // Class Expression
// // const PersonCl = class {}

// // Class Declaration
// // NOTE: we don't use comma between functions as in object literal
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }

//   // Instance methods: method will be added to .prototype property
//   calcAge() {
//     console.log(2050 - this.birthYear);
//   }

//   get age() {
//     return 2050 - this.birthYear;
//   }

//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else console.log(`${name} is not a full name`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // Static method: method that not in prototype, not able to inherited
//   static hey() {
//     console.log('Hey There');
//     console.log(this);
//   }
// }

// const kathy = new PersonCl('Kathy', 2011);
// console.log(kathy);
// kathy.calcAge();
// console.log(kathy.__proto__ === PersonCl.prototype);

// const cindy = new PersonCl('Cindy Huynh', 1990);
// console.log(cindy);

// //// getter and setter: they are property, not method. Need a comma after each of them
// const account = {
//   owner: 'Vuong',
//   movements: [355, 234, 134, 545],

//   get latest() {
//     // slice method will create a new array, movements array stays the same
//     return this.movements.slice(-1).pop();
//   },

//   // setter need at least 1 argument
//   set latest(mov) {
//     return this.movements.push(mov);
//   },
// };
// account.latest;
// console.log(account.movements);

// // account.latest(399) // account.latest is not a function
// account.latest = 399;
// console.log(account.movements);

// //// Static method
// // const h1 = [...document.querySelectorAll('h1')]
// // const h1 = Array.from(document.querySelectorAll('h1'))
// // console.log(h1)
// PersonCl.hello = function () {
//   console.log('Hello');
// };
// PersonCl.hello(); // Hello
// PersonCl.hey(); //  Hey There

// // Object instance can not inherited the static method
// // kathy.hey()

// //// Classes inherit classes ////
// class StudentCl extends PersonCl  {
//   constructor(fullName, birthYear, course) {
//     super(fullName, birthYear);
//     this.course = course
//   }

//   introduce() {
//     console.log(`${this.fullName} is studying ${this.course}`)
//   }

//   // Overwrite
//   calcAge() {
//     console.log(`This is my Vietnamese' age: ${2050 - this.birthYear + 1}`)
//   }
// }

// const jenny = new StudentCl('Jenny Do', 2011, 'BS')
// console.log(jenny)
// jenny.calcAge();

////////////////////////////
// //// Object.create() ////
// const PersonProto = {
//   calcAge() {
//     console.log(2050 - this.birthYear);
//   },

//   init(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   },
// };

// const tim = Object.create(PersonProto);
// console.log(tim); // return an empty {}
// tim.birthYear = 1990;
// tim.calcAge(); // 60

// console.log(PersonProto); // only have the calcAge() method
// console.log(tim); //
// console.log(tim.__proto__ === PersonProto.prototype); // return false
// console.log(tim.__proto__ === PersonProto); // return true

// // Test below and all account objects are in prototype
// const owner = Object.create(account);
// console.log(owner);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class CarCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     console.log((this.speed += 10));
//   }

//   brake() {
//     console.log((this.speed += 5));
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(newSpeed) {
//     this.speed = newSpeed * 1.6;
//   }
// }

// const ford = new CarCl('Ford', 120);
// console.log(ford.speedUS)
// ford.accelerate();
// ford.accelerate();

// ford.speedUS = 50
// console.log(ford.speedUS)
// console.log(ford)

//// Another example of ES6 class ////
/**
 * New ES6 support class fields (properties), include
 * Public fields and methods, private fields and methods
 *
 */

class Account {
  // Public fields (not require const or let)
  locale = navigator.language; // ; is required

  // Private fields
  #moverments = []; // Use # for truely private
  #pin; // declare pin as a private field

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // assignment

    // Extra constructors
    // this._moverments = []; // Use _ for protected (private)
    // this.locale = navigator.language;

    console.log(`Hello ${this.owner}`);
  }

  getMovements() {
    return this.#moverments;
  }

  // Public Field - Public Interface - API
  deposit(amount) {
    this.#moverments.push(amount);
    if (amount > 0) {
      console.log(`${this.owner}, you deposited ${amount}`);
    }
    return this; // return this help chaining methods
  }

  withdraw(amount) {
    this.deposit(-amount);
    console.log(`${this.owner}, you withdrawed ${amount}`);
    return this; // return this help chaining methods
  }

  requestLoan(amount) {
    if (this.#approveLoan) this.deposit(amount);
    console.log('Loan approved');
    return this; // return this help chaining methods
  }

  // Private method
  #approveLoan(amount) {
    return true;
  }
}

const tim = new Account('Tim', 'USD', 1111);
tim.deposit(400);
tim.withdraw(100);
tim.requestLoan(1000);

// Private field '#movements' must be declared in an enclosing class
// tim.#movements.push(10000)

// Chaining method after "return this;"
tim.deposit(399).withdraw(333).requestLoan(1000);
console.log(tim.getMovements())
console.log(tim);
