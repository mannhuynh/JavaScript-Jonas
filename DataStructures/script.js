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

// /* ARRAY DESTRUCTURE - Using square brackets [] */
// const arr = [1, 2, 3];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // Easier way called destructure
// const [x, y, z] = restaurant.mainMenu;
// console.log(x, y, z);

// let [first, , third] = restaurant.categories;
// console.log(first, third);

// // Swapping
// const temp = first;
// first = third;
// third = temp;
// console.log(first, third);

// // Better way for swapping
// let [aa, , cc] = restaurant.categories;
// console.log(aa, cc);
// [aa, cc] = [cc, aa];
// console.log(aa, cc);

// // destructure from method
// console.log(restaurant.order(2, 0));
// const [starter, main] = restaurant.order(2, 0);
// console.log(starter, main);

// // nested array: destruct the inner element
// const nested = [2, 4, [5, 6]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values, now r will be 0
// const [p = 0, q = 0, r = 0] = [8, 9];
// console.log(p, q, r);

// /* OBJECT DESTRUCTURE - Using Curly brackets {} */
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // Change the name of properties while destructuring
// const { name: restaurantName, openingHours: hours } = restaurant;
// console.log(restaurantName, hours);

// // Default value for properties:
// const {menu=[], starterMenu: starters=[], mainMenu: mains} = restaurant;
// console.log(menu, starters, mains)

// // Mutating variables
// // let a = 11;
// // let b = 22;
// // const obj = {a: 55, b: 66, c: 77};
// // ({a, b} = obj); // We need to put whole statement into parenthesis ()
// // console.log(a, b);

// // REST and SPREAD
// function add(...nums) {
//   console.log(...nums,nums)
// }
// add(1,2,3,4,5)
// const xxx = [6,7,8,9,10]
// add(...xxx)


///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [players1, players2] =  game.players;
console.log(players1, players2);

// 2 
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4 
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5
// const {team1, x:draw, team2} = game.odds;
// console.log(team1, draw, team2);

const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
// 6
function printGoals(...playerNames){
  console.log(playerNames);
  // for (let player of playerNames){
    // console.log(`players: ${player}`) 
  // }
  for (let i=0; i<playerNames.length; i++) {
    console.log(playerNames[i])
  }
}
// printGoals(['Davies', 'Muller', 'Lewandowski', 'Kimmich']);
// printGoals(game.scored)
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7
game.odds.team1 < game.odds.team2 && console.log("Team 1 wins");
game.odds.team1 > game.odds.team2 && console.log("Team 2 wins");




