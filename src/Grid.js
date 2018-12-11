/* 
Turn-based game created by using Javascript and jQuery.
GAME'S RULES:
1. Randomly generated game grid included barrier, which players can’t pass through directly.
2. There are two players that can move maximum of 3 squares horizontally or vertically.
3. There are weapons that can inflict different damages, which can be collected by players passing through 
squares that contain a weapon and then replacing it with the weapon which the player currently have.
4. There is also a quiz that can add or take away life point if answered correctly or incoirrectly.
5. If players cross over adjacent squares (horizontally or vertically), a battle begins.
6. Each player attacks in turn with the weapon’s power he currently has. The player can also defend against the 
next shot and sustaining 50% less damage than normal.
7. As soon as the life points of a player falls to 0, the player loses. A message appears and the game is over.
 */

// Variables
const gridSize = 99;
const barrier = 20;
let cells = [];

const startButton = $('#start');
const gridContainer = $('#board-game');
const startContainer = $('#intro');
const body = $('body');
 
// Grid constructor function to create grid cells on the board with obstacles (No Accsess)
const Grid = function(gridSize) {
    this.gridSize = gridSize;

    this.create  = function() {
        for (let i = 0; i <= gridSize; i ++) {
        gridContainer.append('<li class="box" data-index="' + i + '"></li>');
        let cellNum = $('.box').length;
        cells.push(cellNum);
        }
    }
    this.barrier = function(itemClass) {
        addComponents(itemClass) // Weapons.js (177)
    }
}

// Create game grid object
let game = new Grid(gridSize);
