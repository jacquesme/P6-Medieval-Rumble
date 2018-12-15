// Variables
let questionsMark = 5;
let playerActive;
let playerNotActive;
let currentWeapon = 1;
let hover = false;
let scores = 0;
let activePlayer = 1;
let notActivePlayer;
const powerDiv1 = $('.weapon-1');
const powerDiv2 = $('.weapon-2');

// Weapon function constructor:
function Weapon(type, value, itemClass) {
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;

    // Add weapons to the Grid
    this.add = function () {
    addComponents(this.itemClass); // Weapons.js (177)
    }
    //Add quiz mark to the Grid
    this.addExtras = function(){
        for(var i = 1; i<=questionsMark; i++){
            addComponents(this.itemClass); // Weapons.js (177)
        }
    }
};

// Create weapons with their attributes:
let gun1 = new Weapon('Gun1', 25, 'wp-1 weapon');
let sword1 = new Weapon('Sword1', 18, 'wp-2 weapon');
let sword2 = new Weapon('Sword2', 16, 'wp-3 weapon');
let cupcake = new Weapon('CupCake', 10, 'wp-4 weapon');
let cake = new Weapon('Cake', 12, 'wp-5 weapon');
let gun2 = new Weapon('Gun2', 20, 'wp-6 weapon');
let extra = new Weapon ('Extra1', 10, 'quiz-1');

// Replace the weapon on the Grid:
function replaceWeaponOnMap(value, weapon, num) {
    let cell = $('.box[data-index="' + num + '"]');
    whoIsActive();// Weapon.js (136) Check which player is active
    cell.removeClass(weapon).addClass(playerActive.weapon);
    playerActive.weapon = weapon;    
    playerNotActive.power = value;        
}

// Check weapon on the cell and call replace functions (for the player's boards and for the Grid):
function checkWeapon(num) {
    let cell = $('.box[data-index="' + num + '"]');
    if (cell.hasClass('weapon')) {
        if (cell.hasClass('wp-1')) {
            currentWeapon = 1;
            replaceWeaponOnMap(gun1.value, 'wp-1', num); // Weapon.js (39) Replace the weapon on the Grid
            replaceWeaponOnBoard(gun1.value); // Info.js (38) Replace the weapon information on the player's div
            return;
        }
        if (cell.hasClass('wp-2')) {
            currentWeapon = 2;
            replaceWeaponOnMap(sword1.value, 'wp-2', num);
            replaceWeaponOnBoard(sword1.value);
            return;
        }
        if (cell.hasClass('wp-3')) {
            currentWeapon = 3;
            replaceWeaponOnMap(sword2.value,'wp-3',num);
            replaceWeaponOnBoard(sword2.value); 
            return;
        }
        if (cell.hasClass('wp-4')) {
            currentWeapon = 4;
            replaceWeaponOnMap(cupcake.value, 'wp-4', num);
            replaceWeaponOnBoard(cupcake.value);
            return;
        }
            if (cell.hasClass('wp-5')) {
            currentWeapon = 5;
            replaceWeaponOnMap(cake.value,'wp-5', num);
            replaceWeaponOnBoard(cake.value);
            return;
        }
            if (cell.hasClass('wp-6')) {
                currentWeapon = 6;
                replaceWeaponOnMap(gun2.value, 'wp-6', num);
                replaceWeaponOnBoard(gun2.value);
                return;
            }
        
        }
        if (cell.hasClass('quiz-1')) {
            cell.removeClass('quiz-1');
            initQuiz();
            return;
        }

}

// If players cross over adjacent squares (horizontally or vertically), a battle begins
function fight(posNew, posOld) {

    if (posNew.x === posOld.x 
        && posNew.y <= posOld.y + 1 && posNew.y >= posOld.y - 1 ||posNew.y === posOld.y 
        && posNew.x <= posOld.x + 1 && posNew.x >= posOld.x - 1) {
        move = false;
        hover = false;
        fightingArea(); // Info.js (70) When the players fight, the board game is hidden
        scores = 0;
        fightPlayerOne(); // Info.js (110)
        fightPlayerTwo(); // Info.js (126)
    }
}

//Initialize the Game
function initGame() {
    game.create();
    for (let i = 0; i < barrier; i ++) {
        game.barrier('barrier');
    }
    sword1.add();
    sword2.add();
    cupcake.add();
    cake.add();
    gun2.add();
    player1.add();
    player2.add();
    player1.setData(); // data-index num (get and set custom data attributes in my HTML)
    player2.setData(); // data-index num (get and set custom data attributes in my HTML)
    $('.player1').addClass('active'); // Set player 1 to active class
    extra.addExtras(); // (24)

}

initGame();
movePlayer(); // Player.js (62) Initialize the movement of the players

// Check which player is active:
function whoIsActive() { // Player.js (179) if (move)
    if (player1Active) {
        activePlayer = 2;
        notActivePlayer = 1;
        setActivePlayer(player2, player1, powerDiv2); // Info.js (21) Set attributes to the active player to use them by replacing weapon
        setActiveBoard(notActivePlayer, activePlayer); //Info.js (27) Add a class for a playerDiv of the active player to display current information about game flow
        displayMessageOnBoard(activePlayer);  // Info.js (32) Display random message on active player's div
    } else {
        activePlayer = 1; 
        notActivePlayer = 2;
        setActivePlayer(player1, player2, powerDiv1);
        setActiveBoard(notActivePlayer, activePlayer,);
        displayMessageOnBoard(activePlayer);
    }

}

// To find position x and y on the grid 
function getCoordinates(cell) {
    return {
        x: (cell) % 10,
        y: Math.floor((cell) / 10)
    }
}

// To find the position of the box with player class
const boxPosition = (itemClass) => {
    return $(itemClass).data('index');
};
let playerPosition = boxPosition('.player1');
// Old position is the position of not active player in the moment
let posOld = getCoordinates(playerPosition);

// Index of the cell on the grid (from 0 to 99);
function getCellIndex(x, y) {
    return y * 10 + x;
}
/* Add components to the grid function like obstacles, weapon, players, which is used by 'add' function by their function constructor */
let positionRules = null;
function addComponents(itemClass, player) { 
    let restOfCells = cells; //Array of cells []
    let boxes = $('.box');
    let empty = true;
    while (empty) {
        let item = random(gridSize); // Returns a random integer from 0 to 99
        if (player === 1) {
            positionRules = (item % 10 === 0); // Remainder operator (Placed within first column)
        } else if (player === 2) {
            positionRules = (item % 10 === 9); // Remainder operator (Placed on the last column)
        } else {
            positionRules = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (positionRules && restOfCells.includes(item)) {
            boxes.eq(item).addClass(itemClass);
            let index = restOfCells.indexOf(item); // Returns the index of the first occurence of the value in an array
            restOfCells.splice(index, 1); // Remove elements from the array, inserts new elements in their place and returnes the deleted element
            empty = false;
        }
    }
}
// Randomize the boxes on the grid to randomize position of game's components
function random(num) {
    return Math.floor(Math.random() * num); // Returns a random integer from 0 to 99
}