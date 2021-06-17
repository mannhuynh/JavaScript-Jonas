'use strict';

/**
 * There are 3 options to create an 'blue print' 
 * 1. Function Constructor
 * 2. ES6 Class
 * 3. 
 */



/** 
 * 1. New object is created using new keyword
 * 2. Function is called this = {}, the objects instanciated
 * 3. The objects liked to prototype
 * 4. Function automatically return an object {}
 */

//// Function constructor
const Person = function (firstName, lastName, birthYear) {
  this.first = firstName;
  this.last = lastName;
  this.birthYear = birthYear;

  //// Don't construct function in here
  // this.calcAge = function () {
  //   console.log(`${2050 - this.birthYear}`)
  // }
}

// Instanciated => object is created using new keyword
const vuong = new Person('Vuong', 'Huynh', '1990')

// vuong is now an object with this.first = Vuong, this.last = Huynh, this.birthYear = 1990
// console.log(vuong)

// Prototypes: adding method in prototype
Person.prototype.calcAge = function () {
  console.log(`${2050 - this.birthYear}`)
}

// the object linked to prototype
vuong.calcAge(); // 60

// // check prototype: vuong is linked to Person's prototype
// console.log(vuong.__proto__ == Person.prototype)  // true
// console.log(Person.prototype.isPrototypeOf(vuong))  // true

// Adding property in prototype
Person.prototype.species = 'Homo Sapiens';

// // species now is in object's prototype, not in object's constructure
// console.log(vuong.hasOwnProperty('birthYear')); // true
// console.log(vuong.hasOwnProperty('species')); // false

// // but they can be called in the same way
// console.log(vuong.birthYear, vuong.species)
// console.log(vuong.__proto__)
// console.log(Person.prototype.constructor)
// console.dir(Person.prototype.constructor)
// console.log(vuong.__proto__.constructor)
// console.log(vuong.__proto__.__proto__)


///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  console.log(this.speed += 10)
}
Car.prototype.brake = function () {
  console.log(this.speed -= 5)
}

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     console.log(this.speed += 10);
//   }
//   brake() {
//     console.log(this.speed -= 5);
//   }
// }

const bmw = new Car('BMW', 120)
const mer = new Car('Mercedes', 95)
console.log(bmw, mer)
bmw.accelerate()
mer.accelerate()
mer.brake()
mer.accelerate()
mer.accelerate()

