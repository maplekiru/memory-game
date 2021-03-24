"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(COLORS);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */
let cardSelected = null;
let count = 0;
let click = true;

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    // missing code here ...
    let newDiv = document.createElement("div");
    newDiv.classList.add(color, "unflipped");
    gameBoard.appendChild(newDiv);
    newDiv.addEventListener('click', handleCardClick);
  }
}
/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  if (click == true) {
  let temp = evt.currentTarget;
  temp.classList.remove("unflipped");
  temp.removeEventListener('click',handleCardClick);
  flipCard(temp);
  } else return;
}
/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  if(!cardSelected) {
    cardSelected=card;
  } else if (cardSelected){
      click = false;
      if(cardSelected.className == card.className) {
        cardSelected.classList.add("matched");
        card.classList.add("matched");
        cardSelected = null;
        count++;
        setTimeout(function(){
        click = true;
        },500);
      }
      else unFlipCard(card);
  }
  if (count === 5) {
    setTimeout(alert("You win!!!"),500);
    click = false;
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  setTimeout(function(){
    cardSelected.classList.add("unflipped");
    card.classList.add("unflipped");
    cardSelected.addEventListener('click',handleCardClick);
    card.addEventListener('click',handleCardClick);
    cardSelected = null;
    click = true;
  },1000);
}

