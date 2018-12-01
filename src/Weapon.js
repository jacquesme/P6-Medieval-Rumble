// Weapon function constructor:
function Weapon(type, value, itemClass) {
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;

    // Add weapons to the Grid
    this.add = function () {
    addComponents(this.itemClass);
    }
    //Add quiz mark to the Grid
    this.addExtras = function(){
        for(var i = 1; i<=questionsMark; i++){
            addComponents(this.itemClass);
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
    whoIsActive();
    cell.removeClass(weapon).addClass(playerActive.weapon);
    playerActive.weapon = weapon;    
    playerNotActive.power = value;        
}

// Check weapon on the tile and call replace functions (for the player's boards and for the Grid):
function checkWeapon(num) {
    let cell = $('.box[data-index="' + num + '"]');
    if (cell.hasClass('weapon')) {
        if (cell.hasClass('wp-1')) {
            currentWeapon = 1;
            replaceWeaponOnMap(gun1.value, 'wp-1', num);
            replaceWeaponOnBoard(gun1.value);
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
        fightingArea();
        scores = 0;
        fightPlayerOne();
        fightPlayerTwo();
    }
}

//Initialize the Game
function initGame() {
    game.create();
    for (let i = 0; i < barrier; i += 1) {
        game.barrier('barrier');
    }
    sword1.add();
    sword2.add();
    cupcake.add();
    cake.add();
    gun2.add();
    player1.add();
    player2.add();
    player1.setData();
    player2.setData();
    $('.player1').addClass('active');
    extra.addExtras();

}

initGame();
movePlayer();

// Check which player is active:
function whoIsActive() {
    if (player1Active) {
        activePlayer = 2;
        notActivePlayer = 1;
        setActivePlayer(player2, player1, powerDiv2);
        setActiveBoard(notActivePlayer, activePlayer);
        displayMessageOnBoard(activePlayer);  
    } else {
        activePlayer = 1; 
        notActivePlayer = 2;
        setActivePlayer(player1, player2, powerDiv1);
        setActiveBoard(notActivePlayer, activePlayer,);
        displayMessageOnBoard(activePlayer);
    }

}

// To find position x and y on the map 
function getCoordinates(cell) {
    return {
        x: (cell) % 10
        ,
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

// Index of the tile on the grid (from 1 to 100);
function getCellIndex(x, y) {
    return y * 10 + x;
}
/* Add components to the grid function like obstacles, weapon, players, which is used by 'add' function by their function constructor */
let positionRules = null;
function addComponents(itemClass, player) {
    let restOfCells = cells;
    let boxes = $('.box');
    let empty = true;
    while (empty) {
        let item = random(gridSize);
        if (player === 1) {
            positionRules = (item % 10 === 0);
        } else if (player === 2) {
            positionRules = (item % 10 === 9);
        } else {
            positionRules = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (positionRules && restOfCells.includes(item)) {
            boxes.eq(item).addClass(itemClass);
            let index = restOfCells.indexOf(item);
            restOfCells.splice(index, 1);
            empty = false;
        }
    }
}
// Randomize the boxes on the grid to randomize position of game's components
function random(num) {
    return Math.floor(Math.random() * num);
}