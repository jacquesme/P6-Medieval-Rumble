/* 
Turn-based game created by using Javascript and jQuery.
GAME'S RULES:
1. Randomly generated game map included obstacles, which players can’t pass through directly.
2. Two players can move maximum 3 squares horizontally or vertically.
3. Four weapons with different  damage inflicted, which can be collected by players passing through 
them and replacing with the weapon which they currently have.
4. If players cross over adjacent squares (horizontally or vertically), a battle begins.
5. Each player attacks in turn with the weapon’s power he currently has. Player can also defend against 
next shot sustaining 50% less damage than normal.
5. As soon as the life points of a player falls to 0, he loses. A message appears and the game is over.
 */

// Variables
const gridSize = 99;
const barrier = 20;
let cells = [];
let playerActive;
let playerNotActive;
let notActivePlayer;
let activePlayerPowerDiv;
let activePlayer = 1;
let currentWeapon = 1;
let turn = 0;
let attacked = false;
let hover = false;

const attackBtn1 = $('.btn-attack-1');
const attackBtn2 = $('.btn-attack-2');
const defendBtn1 = $('.btn-defend-1');
const defendBtn2 = $('.btn-defend-2');
const startButton = $('#start');
const boardContainer = $('#board-container');
const gridContainer = $('#board-game');
const startContainer = $('#intro');
const gameOverContainer =$('#gameOver');
const playerContainerDiv = $('.player-container');
const powerDiv1 = $('.weapon-1');
const powerDiv2 = $('.weapon-2');
const body = $('body');
const turnMessage = [
"Your move!",
"Try to get a stronger weapon",
"Improve your life points by trying a quiz.",
"Don't attack your oponent to quickly."
]
const noTurnMessage = "It's not your turn yet.";
// Quiz 
let scores = 0;
let questionsMark = 5;

// Grid constructor function to create grid tile board with obstacles (No Accsess)
const Grid = function(gridSize) {
    this.gridSize = gridSize;

    this.create  = function() {
        for (let i = 0; i <= gridSize; i += 1) {
        gridContainer.append('<li class="box" data-index="' + i + '"></li>');
        let cellNum = $('.box').length;
        cells.push(cellNum);
        }
    }
    this.barrier = function(itemClass) {
        addComponents(itemClass)
    }
}

// Create game grid object
let game = new Grid(gridSize);