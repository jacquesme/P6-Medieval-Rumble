'use strict';

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
var gridSize = 99;
var barrier = 20;
//let cells = [];
var possibleMoves = 3;
var playerActive = void 0;
var playerNotActive = void 0;
var notActivePlayer = void 0;
var activePlayerPowerDiv = void 0;
var activePlayer = 1;
var currentWeapon = 1;
var turn = 0;
var playerDefend = null;
var player1Active = true;
var player2Active = false;
var move = true;
var attacked = false;
var hover = false;

var attackBtn1 = $('.btn-attack-1');
var attackBtn2 = $('.btn-attack-2');
var defendBtn1 = $('.btn-defend-1');
var defendBtn2 = $('.btn-defend-2');
var startButton = $('#start');
var boardContainer = $('#board-container');
var gridContainer = $('#board-game');
var startContainer = $('#intro');
var gameOverContainer = $('#gameOver');
var playerContainerDiv = $('.player-container');
var powerDiv1 = $('.weapon-1');
var powerDiv2 = $('.weapon-2');
var body = $('body');
var turnMessage = ["Your move!", "Try to get a stronger weapon", "Improve your life points by trying a quiz.", "Don't attack your oponent to quickly."];
var noTurnMessage = "It's not your turn yet.";
// Quiz 
var scores = 0;
var questionsMark = 5;

// Grid constructor function to create grid tile board with obstacles (No Accsess)
var Grid = function Grid(gridSize) {
    this.gridSize = gridSize;

    this.create = function () {
        for (var i = 0; i <= gridSize; i += 1) {
            gridContainer.append('<li class="box" data-index="' + i + '"></li>');
            //let cellNum = $('.box').length;
            //cells.push(cellNum);
        }
    };
    this.barrier = function (itemClass) {
        addComponents(itemClass);
    };
};

// Create game grid object
var game = new Grid(gridSize);