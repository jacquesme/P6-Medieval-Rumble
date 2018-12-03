"use strict";

/*INFORMATION ON THE PLAYER DIV*/

// Variables
var activePlayerPowerDiv = void 0;
var turn = 0;

var turnMessage = ["Your move!", "Try to get a stronger weapon", "Improve your life points by trying a quiz.", "Don't attack your oponent to quickly."];
var noTurnMessage = "It's not your turn yet.";

var attackBtn1 = $('.btn-attack-1');
var attackBtn2 = $('.btn-attack-2');
var defendBtn1 = $('.btn-defend-1');
var defendBtn2 = $('.btn-defend-2');
var boardContainer = $('#board-container');
var gameOverContainer = $('#gameOver');

//Set attributes to the active player to use them by replacing weapon
function setActivePlayer(Active, notActive, activePowerDiv) {
    playerActive = Active;
    playerNotActive = notActive;
    activePlayerPowerDiv = activePowerDiv;
}
//Add a class for a playerDiv of the active player to display current information about game flow
function setActiveBoard(notActivePlayer, activePlayer) {
    $('#player-' + notActivePlayer).removeClass('active-board');
    $('#player-' + activePlayer).addClass('active-board');
}
//Display random message on active player's div
function displayMessageOnBoard(activePlayer) {
    var text = turnMessage[Math.floor(Math.random() * turnMessage.length)];
    $('.turn-' + activePlayer).text(text);
    $('.turn-' + notActivePlayer).text(noTurnMessage);
}
//Replace the information on the player's div:
function replaceWeaponOnBoard(power) {
    whoIsActive();
    $('.weaponPic-' + notActivePlayer).empty();
    $('<img src="image/wp-' + currentWeapon + '.png">').appendTo(".weaponPic-" + notActivePlayer);
    $(".weapon-" + notActivePlayer).text(power);
}
// Extra points for the players if they cross through 'quiz' square.
function addExtraPoints() {
    whoIsActive();
    playerActive.life += scores;
    $('#life-' + playerActive.player).text(playerActive.life);
}
// Show and hide buttons during the fight
function combat() {
    if (turn == 0) {
        attackBtn1.hide();
        defendBtn1.hide();
        attackBtn2.hide();
        defendBtn2.hide();
    } else if (turn == 1) {
        attackBtn2.hide();
        defendBtn2.hide();
        attackBtn1.show();
        defendBtn1.show();
    } else if (turn == 2) {
        attackBtn1.hide();
        defendBtn1.hide();
        attackBtn2.show();
        defendBtn2.show();
    }
}
// When the players fight, the board game is hidden
function fightingArea() {
    boardContainer.hide();
    gridContainer.hide();
    $('#player-1').css('margin-left', '300px');
    $('#player-2').css('margin-right', '300px');
    $(body).css({
        'backgroundImage': 'url("image/background.jpg")',
        'backgroundSize': 'no-repeat'
    });
    $('div.turn-1').empty();
    $('div.turn-2').empty();
    $('#player-' + activePlayer).removeClass('active-board');
    attackBtn1.show();
    defendBtn1.show();
}
// Display Game Screen at the end, when battle is finished
function gameOverBoard() {
    $('.player-container').hide();
    $('header').hide();
    gameOverContainer.show();
    player1.winner(player2);
}

/*---------------------------------------------------------------------------------------------------------------- */
/*BUTTONS*/
function startGame() {
    playerContainerDiv.show();
    gridContainer.show();
    startContainer.hide();
    attackBtn1.hide();
    attackBtn2.hide();
    defendBtn1.hide();
    defendBtn2.hide();
    $('#player-1').addClass('active-board');
};

// Attack and defend buttons connected with attack function mentioned in player function constructor
function fightPlayerOne() {
    attackBtn1.click(function () {
        player1.attack(player2); // Player.js (30) Player fight
        playerDefend = 0;
        turn = 2;
        activePlayer = 2;
        combat(); // Info.js (51) Show and hide buttons during the fight
    });
    defendBtn1.click(function () {
        playerDefend = 1;
        turn = 2;
        activePlayer = 2;
        combat(); // Info.js (51) Show and hide buttons during the fight
    });
}
function fightPlayerTwo() {
    attackBtn2.click(function () {
        player2.attack(player1); // Player.js (30) Player fight
        playerDefend = 0;
        turn = 1;
        activePlayer = 1;
        combat(); // Info.js (51) Show and hide buttons during the fight
    });
    defendBtn2.click(function () {
        turn = 1;
        playerDefend = 1;
        activePlayer = 1;
        combat(); // Info.js (51) Show and hide buttons during the fight
    });
}