'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Display all movements by changing the content of movement container using the insertAdjacentHTML method with 'afterbegin' position
// https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const sortedMoves = movements.slice().sort((a, b) => a - b);
  const moves = sort ? sortedMoves : movements;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>          
          <div class="movements__value">${mov}</div>
        </div>        
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate the accounts balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((accum, move) => accum + move, 0);
  labelBalance.innerHTML = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  // Incomes are total amount deposited
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);

  // Outcomes: total amount withdraw
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);

  // Interest: account incomes * interestRate / 100
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(mov => mov > 1) // Only interest of 1 or higher is applied
    .reduce((accum, mov) => accum + mov, 0);

  labelSumIn.innerHTML = incomes + '€';
  labelSumOut.innerHTML = outcomes + '€';
  labelSumInterest.innerHTML = `${interest}€`;
};

// Create account username for each owner in the accounts array
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

// Update UI whenever the movements changed.
const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);

  // Display balance
  calcDisplayBalance(account);

  // Display summaries
  calcDisplaySummary(account);
};

// Implement the login event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent form from summiting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (!currentAccount || currentAccount?.pin !== Number(inputLoginPin.value)) {
    labelWelcome.textContent = 'Incorrect username or password';
    containerApp.style.opacity = 0;
    inputLoginPin.value = '';
  }
  // Using the ?. notation to avoid error if username not found
  else if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display login message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear username and pin values
    inputLoginPin.value = inputLoginUsername.value = '';

    // Remove focus on pin form
    inputLoginPin.blur();

    // update UI for movements
    updateUI(currentAccount);
  } else {
  }
});

// Implement transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Check the amount to transfer
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    currentAccount.username !== receiverAcc?.username &&
    receiverAcc
  ) {
    // deduct amount from current account and add to receiver
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update movements and delete values on input form
    updateUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = '';

    document.querySelector('.operation--transfer h2').innerHTML = `
    Transfer more?
    `;
  } else {
    document.querySelector('.operation--transfer h2').innerHTML = `
    Invalid transfer
    `;
  }
});

// Granding Loan implementation
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  const loanCondition = currentAccount.movements.some(
    mov => mov >= amount * 0.1
  );
  if (amount > 0 && loanCondition) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
    inputLoanAmount.value = '';
    document.querySelector('.operation--loan h2').innerHTML = `
    Request more loan?
    `;
  } else {
    document.querySelector('.operation--loan h2').innerHTML = `
    Invalid Amount
    `;
    inputLoanAmount.value = '';
  }
});

// Close account implementation
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
});

// Implement the sort function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// MAP return a new array//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// const moo = movements.map((mov, i) => `move ${i+1}: ${mov > 0 ? "deposit" : "withdraw"} ${mov}`)
// console.log(...moo)
// const allAccMovements = accounts.map(acc => acc.movements)

// const allAccMovements = accounts.map(function (acc) {
//   return acc.movements;
// });
// console.log(allAccMovements);

// // using FLAT
// const flatAllMovements = allAccMovements.flat();
// const totalMovements = flatAllMovements.reduce(
//   (accum, current) => accum + current,
//   0
// );
// console.log(totalMovements);

// // Using FLATMAP
// const flatMapMoves = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((accum, current) => accum + current);
// console.log(flatMapMoves);

/////////////////
// FILTER return the result array//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

// const filterMove = movements.filter(mov => mov > 0);
// console.log(filterMove);

/////////////////
// FIND same as FILTER but only return the first match element //
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

// const firstWithdraw = movements.find(mov => mov < 0);
// console.log(firstWithdraw)

// // FIND the account owner name  "Jessica Davis"
// const jessAccount = accounts.find(account => account.owner === "Jessica Davis")
// console.log(jessAccount)

// let account;
// for (const acc of accounts){
//   if (acc.owner === "Jessica Davis") {
//     account = acc;
//     break;
//   }
// }
// console.log(account)

/////////////////
// FINDINDEX return the index found, not element //
// const moveIndex = movements.findIndex(mov => mov === 3000)
// console.log(moveIndex)  // return 3

////////////////////////////
// REDUCE return a prime result //
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

// const maxMov = movements.reduce((accum, move) => accum > move ? accum : move, movements[0])
// console.log(maxMov)

//////////
// INCLUDE return true or false
// console.log(movements.includes(-300))

////////////////
/// SOME and EVERY return true or false //////
// console.log(movements.some(mov => mov > 2999))  // true
// console.log(movements.every(mov => mov > 2999))  // false

// ARRAY.FROM()
const x = Array.from({ length: 100 }, (_, i) =>
  Math.floor(Math.random(i) * 100 + 1)
);
console.log(x);
