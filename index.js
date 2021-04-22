'use strict';
console.log('funguju');
let player = 'circle';
const playerElm = document.querySelector('#player');
const btnElm = document.querySelectorAll('.field__cell');

const switchPlayer = () => {
  if (player === 'circle') {
    player = 'cross';
    playerElm.src = 'images/cross.svg';
  } else {
    player = 'circle';
    playerElm.src = 'images/circle.svg';
  }
};

btnElm.forEach((field) => {
  field.addEventListener('click', (event) => {
    if (
      !event.target.classList.contains('field__cell--circle') &&
      !event.target.classList.contains('field__cell--cross')
    ) {
      if (player === 'circle') {
        event.target.classList.add('field__cell--circle');
      } else {
        event.target.classList.add('field__cell--cross');
      }
      event.target.setAttribute('disabled', '');
      switchPlayer();
      isWinningMove(event.target);
      if (isWinningMove(event.target) === true) {
        if (getSymbol(event.target) === 'circle') {
          setTimeout(() => {
            vitez('Vítězem je kolečko. Nová hra?');
          }, 150);
        } else if (getSymbol(event.target) === 'cross') {
          setTimeout(() => {
            vitez('Vítězem je křížek. Nová hra?');
          }, 150);
        }
      }
    }
  });
});

//refresh z hlášky//

const vitez = (message) => {
  let ok = confirm(message);
  if (ok === true) {
    location.reload();
  }
};

//určení pozice pole //
const fieldSize = 10;

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < btnElm.length) {
    if (field === btnElm[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / fieldSize),
    column: fieldIndex % fieldSize,
  };
};

console.log(getPosition(btnElm[0]));

//funkce get field//

const getField = (row, column) => btnElm[row * fieldSize + column];

console.log(getField(2, 3));

//funkce vrátí symbol//

const getSymbol = (field) => {
  if (field.classList.contains('field__cell--circle')) {
    return 'circle';
  } else if (field.classList.contains('field__cell--cross')) {
    return 'cross';
  }
};

//určení vítěze//

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < fieldSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < fieldSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //diagonály//

  let j;

  let diagonalaX = 1;
  let diagonalaY = 1;
  j = origin.row;
  i = origin.column;

  while (
    j < fieldSize - 1 &&
    i > 0 &&
    symbol === getSymbol(getField(j + 1, i - 1))
  ) {
    diagonalaX++;
    j++;
    i--;
  }

  j = origin.row;
  i = origin.column;
  while (
    j > 0 &&
    i < fieldSize - 1 &&
    symbol === getSymbol(getField(j - 1, i + 1))
  ) {
    diagonalaX++;
    i++;
    j--;
  }

  if (diagonalaX >= symbolsToWin) {
    return true;
  }
  j = origin.row;
  i = origin.column;
  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i - 1))) {
    diagonalaY++;
    i--;
    j--;
  }

  j = origin.row;
  i = origin.column;
  while (
    j < fieldSize - 1 &&
    i < fieldSize - 1 &&
    symbol === getSymbol(getField(j + 1, i + 1))
  ) {
    diagonalaY++;
    i++;
    j++;
  }

  if (diagonalaY >= symbolsToWin) {
    return true;
  }

  return false;
};
