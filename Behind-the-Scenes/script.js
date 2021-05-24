'use strict';
// Variable Environment = VE

const firstName = 'Tim';

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  
  function printAge() {
    const output = `${firstName}. You are ${age}, born in ${birthYear}`;
    console.log(output);

    function callName(name){
      
      const firstName = 'Kathy';
      console.log(`We can call firstName ${name} from anywhere because it is global VE`);
      console.log(`firstName is overwriten here ${firstName}`);
    }
    // firstName in the argument is from global VE
    callName(firstName);
  }

  if (birthYear >= 1981 && birthYear <= 1995) {
    // var is function scope VE, we can call it from outside in the closest function
    var millenial = true;
    // const and let are block scope VE. Can't call from outside
    const str = `Your age is millenial, ${firstName}`;
    console.log(str);
  }
  // We can call var VE from here
  console.log(millenial);

  printAge();
  return age;
}

// Can't call millenial from here, we are in 1 scope further
// console.log(millenial);


calcAge(1990)

