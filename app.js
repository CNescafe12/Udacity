/*
 * Create a list that holds all of your cards
 */
 const cardsList = [
  'fa fa-paper-plane-o',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-cube',
  'fa fa-leaf',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-bicycle',
  'fa fa-diamond',
  'fa fa-diamond',
  'fa fa-bomb',
  'fa fa-bomb'
  ];

// Shuffle the list of cards using the provided "shuffle" method below
shuffle(cardsList);

const creation = document.querySelector('.deck');
// Display the cards on the page
function initGame() {
    // Loop through each card and create its HTML
    for (let i = 0; i < cardsList.length; i++) {
        const card = document.createElement('li');
        // Add each card's HTML to the page
        card.classList.add('card');
        card.innerHTML = `<i class = "${cardsList[i]}" ></i>`; 
        creation.appendChild(card);
        addClickEevent(card);

    } // End for loop
 }

initGame();

let isItFirstClick = true;
// Set up the event listener for the cards
function addClickEevent(cardd) {
    cardd.addEventListener('click', function() {
        if (isItFirstClick) {
            startWatch();
            isItFirstClick=false;
        }
        // If the card not opened, click it and display the card's symbol 
    if (!cardd.classList.contains('open', 'show', 'match')) { 
        cardd.classList.add('open', 'show', 'disable');
        // Add the card to a *list* of "open" cards 
        opendCardList.push(cardd);
        // Use function 'compareCards' to compare between two cards
        compareCards(opendCardList[0], opendCardList[1]);
    }

    }); // End event listener
} // End addClickEevent function

let opendCardList = [];
let matchCardList = [];
// Fuction to compare between cards
function compareCards(c1, c2) {
    // If cards matched
    if (opendCardList.length === 2) {
        // If the cards do match, lock the cards in the open position
        if(opendCardList[0].innerHTML === opendCardList[1].innerHTML) {
            opendCardList[0].classList.add('match')
            opendCardList[1].classList.add('match')
            opendCardList = [];
            matchCardList.push(opendCardList[0], opendCardList[1]);
            gameOver();
        
        // If cards not matched
        } else {
            setTimeout(function(e) { 
                // If the cards do not match, remove the cards from the list and hide the card's symbol         
                opendCardList[0].classList.remove('open', 'show', 'disable');
                opendCardList[1].classList.remove('open', 'show', 'disable');
                
                opendCardList=[];
            }, 500); // End setTimeout function
                 
            
        } // End else
        
        moves();
        star();

    } // End if
}

const modal = document.getElementById("myModal");
let msg = document.getElementById('massage');
const btn = document.getElementById("replayBtn");
const span = document.getElementsByClassName("close")[0];
// Function if the game is over,print the result
function gameOver() {
    stopWatch();
    // If all cards have matched, display a message with the final score
    if (matchCardList.length === cardsList.length) {
        setTimeout(function() {  
            modal.style.display = 'block';
            msg.innerText = `You won the game with ${counter} moves and ${starsNum} stars woooow!`;
            // When the user clicks on replay button, start new game 
            btn.onclick =function(e) {
                modal.style.display = 'none';
                creation.innerHTML = '';
                initGame();
                matchCardList = [];
                move.innerText = '0';
                counter = 1;
                time.innerHTML = '0';
                totalSeconds = 0;
                isItFirstClick = true;    
                rate.innerHTML = `
                <li><i class = "fa fa-star"></i></li>
                <li><i class = "fa fa-star"></i></li>
                <li><i class = "fa fa-star"></i></li>`;                 
                stopWatch(); 
                shuffle(cardsList); 
            }
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = 'none';
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }            
        }, 500);
    } // End if
}

// Reset game function
function resetGame() {
    const reset = document.querySelector('.restart')
    reset.addEventListener('click', function() {
        creation.innerHTML = '';
        initGame();
        matchCardList = [];
        move.innerText = '0';
        counter = 1;
        time.innerHTML = '0';
        totalSeconds = 0;
        isItFirstClick = true;    
        rate.innerHTML = `
        <li><i class = "fa fa-star"></i></li>
        <li><i class = "fa fa-star"></i></li>
        <li><i class = "fa fa-star"></i></li>
        `;
        stopWatch(); 
        shuffle(cardsList); 
        
    }); // End addEventListener function
}

resetGame();

// Increment the move counter and display it on the page
let counter = 1;
let move = document.querySelector('.moves');
move.innerText = '0';
function moves() {
    move.innerText=counter++; 
}

// Rating and stars function
let starsNum = 0;
const rate = document.querySelector('.stars');
function star() {
    if (counter < 10) { 
        rate.innerHTML = 
        `<li><i class = "fa fa-star"></i></li> 
        <li><i class = "fa fa-star"></i></li> 
        <li><i class = "fa fa-star"></i></li>`;
        starsNum = 3;
    
    } else if (counter < 18) {
        rate.innerHTML = 
        `<li><i class = "fa fa-star"></i></li> 
        <li><i class = "fa fa-star"></i></li> 
        <li><i class = "fa fa-star checked"></i></li>`;
        starsNum = 2;

    } else {
       rate.innerHTML = 
       `<li><i class = "fa fa-star"></i></li> 
       <li><i class = "fa fa-star checked"></i></li>
        <li><i class = "fa fa-star checked"></i></li>`;
        starsNum = 1; 
    }
}

const time = document.querySelector('.timer');
let totalSeconds = 0;
let count;
time.innerHTML = totalSeconds + ' s';
// Start counting time function
function startWatch() {
     count = setInterval(function() {
                totalSeconds++;
                time.innerHTML = totalSeconds + 's';
    }, 600);
}

// Stop counting time function
function stopWatch() {
    clearInterval(count);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}