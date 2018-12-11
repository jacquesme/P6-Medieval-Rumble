'use strict';

// Variables
var playerDefend = null;
var player1Active = true;
var player2Active = false;
var move = true;
var possibleMoves = 3;
var attacked = false;

var playerContainerDiv = $('.player-container');

// Player construction function
var Player = function Player(name, life, itemClass, player, weapon, power, activePath) {
    this.name = name;
    this.life = life;
    this.itemClass = itemClass;
    this.player = player;
    this.weapon = weapon;
    this.power = power;
    this.activePath = activePath;

    //Add players to the Grid
    this.add = function () {
        addComponents(this.itemClass, this.player); // Weapons.js (177)
    };
    // Set information about player on the player information Div;
    this.setData = function () {
        $('.name-' + this.player).text(this.name);
        $('#life-' + this.player).text(this.life);
        $('<img src="image/wp-1.png">').appendTo(".weaponPic-" + this.player);
        $('.weapon-' + this.player).text(this.power);
    };
    //Player fight 
    this.attack = function (whichPlayer) {
        if (playerDefend == 1) {
            whichPlayer.life -= this.power / 2;
            playerDefend = 0;
        } else {
            whichPlayer.life -= this.power;
        }
        $('#life-' + whichPlayer.player).text(whichPlayer.life);
        if (whichPlayer.life <= 0) {
            gameOverBoard();
        }
    };
    // Display the winner and loser of the game and display the information on the Game Over Screen 
    this.winner = function (whichPlayer) {
        if (whichPlayer.life <= 0) {
            $('#winner').text(this.name);
            $('#looser').text(whichPlayer.name);
        } else if (this.life <= 0) {
            $('#winner').text(whichPlayer.name);
            $('#looser').text(this.name);
        }
    };
};

// Create Players
var player1 = new Player('Don', 100, 'player1', 1, 'wp-1', 25, 'image/path-1.png');
var player2 = new Player('Dennis', 100, 'player2', 2, 'wp-1', 25, 'image/path-2.png');

// Initialize the movement of the players:
// Players can move by the mouse click 3 cells horizontally or vertically, avoiding boxes with obstacles
function movePlayer() {
    var gameBox = $('.box');
    // Mouseover method shows the possible move of the player
    gameBox.hover(function () {
        hover = true;
        var sqHovered = $(this).data('index');
        var posNew = getCoordinates(sqHovered); //Weapons.js(153) Get coordinates x and y
        //Check the posible move horizontally
        // Old position is the position of not active player in the moment
        for (var i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
            var num = getCellIndex(i, posOld.y); // Weapons.js(171) Get cell index (0 to 99)
            var cell = $('.box[data-index="' + num + '"]');
            if (cell.hasClass('barrier')) {
                return;
            }
            if (player1Active) {
                if (cell.hasClass('player2')) {
                    return;
                }
            } else {
                if (cell.hasClass('player1')) {
                    return;
                }
            }
        }
        //Check the posible move vertically 
        // Old position is the position of not active player in the moment
        for (var _i = Math.min(posOld.y, posNew.y); _i <= Math.max(posOld.y, posNew.y); _i++) {
            var _num = getCellIndex(posOld.x, _i); // Weapons.js(169) Get cell index (0 to 99)
            var _cell = $('.box[data-index="' + _num + '"]');
            if (_cell.hasClass('barrier')) {
                return;
            }
            if (player1Active) {
                if (_cell.hasClass('player2')) {
                    return;
                }
            } else {
                if (_cell.hasClass('player1')) {
                    return;
                }
            }
        }
        if (!attacked) {
            // If players don't cross adjacent cell, their path for possible movement will be shown in red or //yellow block (activePath)
            if (posNew.y === posOld.y && posNew.x <= posOld.x + possibleMoves && posNew.x >= posOld.x - possibleMoves || posNew.x === posOld.x && posNew.y <= posOld.y + possibleMoves && posNew.y >= posOld.y - possibleMoves) {

                if (player1Active) {
                    $(this).css('backgroundImage', 'url(' + player1.activePath + ')');
                } else {
                    $(this).css('backgroundImage', 'url(' + player2.activePath + ')');
                }
            }
        }
        // If the movement isn't possible hover is false and the posible movement won't be shown (no red or //yellow activePath)
    }, function () {
        hover = false;
        $(this).css('backgroundImage', '');
    });
    // By the click method choose the next position of the player 
    gameBox.on('click', function () {
        hover = false;
        var sqClicked = $(this).data('index');
        var posNew = getCoordinates(sqClicked); //Weapons.js(153) Get coordinates x and y
        //New position of the player chosen by mouse click horizontally - coordinate X
        for (var i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
            var num = getCellIndex(i, posOld.y); // Weapons.js(169) Get cell index (0 to 99)
            var cell = $('.box[data-index="' + num + '"]');
            // If new tile includes obstacle - don't move
            if (cell.hasClass('barrier')) {
                $(this).css('cursor', 'not-allowed');
                return;
            }
            // If new cell includes players - don't move
            if (player1Active) {
                if (cell.hasClass('player2')) {
                    return;
                }
            } else {
                if (cell.hasClass('player1')) {
                    return;
                }
            }
        }
        //Check possible new position of the player chosen by mouse click vertically - coordinate x
        for (var _i2 = Math.min(posOld.y, posNew.y); _i2 <= Math.max(posOld.y, posNew.y); _i2++) {
            var _num2 = getCellIndex(posOld.x, _i2); // Weapons.js(169) Get cell index (0 to 99)
            var _cell2 = $('.box[data-index="' + _num2 + '"]');
            // If new tile includes obstacle - don't move
            if (_cell2.hasClass('barrier')) {
                $(this).css('cursor', 'not-allowed');
                return;
            }
            // If new cell includes players - don't move
            if (player1Active) {
                if (_cell2.hasClass('player2')) {
                    return;
                }
            } else {
                if (_cell2.hasClass('player1')) {
                    return;
                }
            }
        }
        // If new cell includes players - don't move
        if (player1Active) {
            if ($(this).hasClass('player1')) {
                return;
            }
        } else {
            if ($(this).hasClass('player2')) {
                return;
            }
        }

        if (move) {
            // Check when the player can move maximum 3 cell (possibleMoves) horizontally or vertically
            if (posNew.y === posOld.y && posNew.x <= posOld.x + possibleMoves && posNew.x >= posOld.x - possibleMoves || posNew.x === posOld.x && posNew.y <= posOld.y + possibleMoves && posNew.y >= posOld.y - possibleMoves) {
                // Check the position X
                for (var _i3 = Math.min(posOld.x, posNew.x); _i3 <= Math.max(posOld.x, posNew.x); _i3++) {
                    var _num3 = getCellIndex(_i3, posOld.y); // Weapons.js(169) Get cell index (0 to 99)
                    checkWeapon(_num3); //Weapon.js (48) Check which weapon is contained within the cell
                }
                // Check the position Y
                for (var _i4 = Math.min(posOld.y, posNew.y); _i4 <= Math.max(posOld.y, posNew.y); _i4++) {
                    var _num4 = getCellIndex(posOld.x, _i4); // Weapons.js(169) Get cell index (0 to 99)
                    checkWeapon(_num4); //Weapon.js (48) Check which weapon is contained within the cell
                }
                whoIsActive(); // Weapon.js (138)
                // If the player moved, his cell lose a class 'active', which is set to opposite player
                if (player1Active) {
                    playerPosition = boxPosition('.player2'); // Weapon.js (163) To find the position of the box with player class
                    posOld = getCoordinates(playerPosition); // Weapon.js (153)To find position x and y on the grid
                    $('.player1').removeClass('player1').removeClass('active');
                    $(this).addClass('player1');
                    $('.player2').addClass('active');
                    fight(posNew, posOld); // Weapon.js (97) If players cross over adjacent squares (horizontally or vertically), a battle begins
                    player1Active = false;
                } else {
                    playerPosition = boxPosition('.player1');
                    posOld = getCoordinates(playerPosition); //Weapons.js(153) Get coordinates x and y
                    $('.player2').removeClass('player2').removeClass('active');
                    $(this).addClass('player2');
                    $('.player1').addClass('active');
                    fight(posNew, posOld);
                    player1Active = true;
                }
            }
        }
    });
}