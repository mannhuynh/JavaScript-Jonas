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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
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

displayMovements(account1.movements);

// Calculate the accounts balance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((accum, move) => accum + move, 0);
  labelBalance.innerHTML = `${balance}€`;
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((accum, mov) => accum + mov, 0);
  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((accum, mov) => accum + mov, 0);
  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * 1.2) / 100)
    .reduce((accum, mov) => accum + mov, 0);

  labelSumIn.innerHTML = incomes + '€';
  labelSumOut.innerHTML = outcomes + '€';
  labelSumInterest.innerHTML = `${interest}€`;
};

calcDisplaySummary(account1.movements);

calcDisplayBalance(account1.movements);
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
// const moo = movements.map((mov, i) => `move ${i+1}: ${mov > 0 ? "deposit" : "withdraw"} ${mov}`)
// console.log(...moo)

// FILTER return the result array//
// const filterMove = movements.filter(mov => mov > 0);
// console.log(filterMove);

// FIND same as FILTER but only return the first match element //
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


// REDUCE return a prime result //
// const maxMov = movements.reduce((accum, move) => accum > move ? accum : move, movements[0])
// console.log(maxMov)

