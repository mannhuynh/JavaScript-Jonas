'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/* ARRAY DESTRUCTURE - Using square brackets [] */
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Easier way called destructure
const [x, y, z] = restaurant.mainMenu;
console.log(x, y, z);

let [first, , third] = restaurant.categories;
console.log(first, third);

// Swapping
const temp = first;
first = third;
third = temp;
console.log(first, third);

// Better way for swapping
let [aa, , cc] = restaurant.categories;
console.log(aa, cc);
[aa, cc] = [cc, aa];
console.log(aa, cc);

// destructure from method
console.log(restaurant.order(2, 0));
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

// nested array: destruct the inner element
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values, now r will be 0
const [p = 0, q = 0, r = 0] = [8, 9];
console.log(p, q, r);

/* OBJECT DESTRUCTURE - Using Curly brackets {} */
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Change the name of properties while destructuring
const { name: restaurantName, openingHours: hours } = restaurant;
console.log(restaurantName, hours);

// Default value for properties:
const {menu=[], starterMenu: starters=[], mainMenu: mains} = restaurant;
console.log(menu, starters, mains)

// Mutating variables
// let a = 11;
// let b = 22;
// const obj = {a: 55, b: 66, c: 77};
// ({a, b} = obj); // We need to put whole statement into parenthesis ()
// console.log(a, b);

// REST and SPREAD
function add(...nums) {
  console.log(...nums,nums)
}
add(1,2,3,4,5)
const xxx = [6,7,8,9,10]
add(...xxx)
