// Backend Logic
function Gem(type){
  this.type = type;
  this.pointVal = 50;
  this.col;
  this.row;
}
var matches;
var coordArray=[];
var gem1 = new Gem ("red");
var gem2 = new Gem ("blue");
var gem3 = new Gem ("red");
var gem4 = new Gem ("blue");
var gem5 = new Gem ("blue");
var gem6 = new Gem ("red");
var gem7 = new Gem ("blue");
var gem8 = new Gem ("red");
var gem9 = new Gem ("red");
var gem10 = new Gem ("blue");
var gem11 = new Gem ("red");
var gem12 = new Gem ("blue");
var gem13 = new Gem ("blue");
var gem14 = new Gem ("red");
var gem15 = new Gem ("blue");
var gem16 = new Gem ("red");

function Board() {
  // this.board= []
  // for (var i = 0; i < 4; i++) {
  //   this.board.push([]);
  //   console.log(this.board);
  // }
  // return this.board;
  this.board = [[gem1, gem2, gem3, gem4], [gem5, gem6, gem7, gem8], [gem9, gem10, gem11, gem12], [gem13, gem14, gem15, gem16]];
}

Board.prototype.genGem = function(max) {
  var gem;
  for (var i = 0; i < this.board.length; i++) {
    for (var j = this.board[i].length; j < this.board.length; j++) {
      var number = Math.floor(Math.random() * (max + 1));
      if (number === 0) {
        gem = new Gem("blue");
      }else if (number === 1) {
        gem = new Gem("red");
      }else if (number === 2) {
        gem = new Gem("green");
      }else if (number === 3) {
        gem = new Gem("yellow");
      }
      this.board[i].push(gem);
    }
  }
};

Board.prototype.swapGems = function (coordArray) {
  // debugger;
  var gem1Type = this.board[coordArray[0]][coordArray[1]].type;
  this.board[coordArray[0]][coordArray[1]].type = this.board[coordArray[2]][coordArray[3]].type;
  this.board[coordArray[2]][coordArray[3]].type = gem1Type;
};

Board.prototype.conditionA = function (i, j) {
  if (this.board[i][j].type === this.board[i - 1][j].type && this.board[i][j].type === this.board[i - 2][j].type) {
    return true;
  }else {
    return false;
  }
};

Board.prototype.conditionB = function (i, j) {
  if (this.board[i][j].type === this.board[i - 1][j].type && this.board[i][j].type === this.board[i + 1][j].type) {
    return true;
  }else {
    return false;
  }
};

Board.prototype.conditionC = function (i, j) {
  if (this.board[i][j].type === this.board[i + 1][j].type && this.board[i][j].type === this.board[i + 2][j].type) {
    return true;
  }else {
    return false;
  }
};
Board.prototype.conditionD = function (i, j) {
  if (this.board[i][j].type === this.board[i][j - 1].type && this.board[i][j].type === this.board[i][j - 2].type) {
    return true;
  }else {
    return false;
  }
};

Board.prototype.conditionE = function (i, j) {
  if (this.board[i][j].type === this.board[i][j - 1].type && this.board[i][j].type === this.board[i][j + 1].type) {
    return true;
  }else {
    return false;
  }
};

Board.prototype.conditionF = function (i, j) {
  if (this.board[i][j].type === this.board[i][j + 1].type && this.board[i][j].type === this.board[i][j + 2].type) {
    return true;
  }else {
    return false;
  }
};
Board.prototype.match = function () {
  // debugger;
  matches = new Set();
  var start = this.board.length-1;
  var match = false;
  for (var i = start; i >= 0; i--) {
    for (var j = start; j >= 0; j--) {
      if (i > 1 && i<start-1) {

        if (this.conditionA(i, j) || this.conditionB(i, j) || this.conditionC(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (i === 1) {

        if (this.conditionB(i, j) || this.conditionC(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (i === 0) {

        if (this.conditionC(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (i === start - 1) {

        if (this.conditionA(i, j) || this.conditionB(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (i === start) {
        if (this.conditionA(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
        // evaluating rows

      // evaluating columns
      if (j > 1 && j<start-1) {

        if (this.conditionD(i, j) || this.conditionE(i, j) || this.conditionF(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (j === 1) {

        if (this.conditionE(i, j) || this.conditionF(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (j === 0) {

        if (this.conditionF(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (j === start - 1) {

        if (this.conditionD(i, j) || this.conditionE(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
      if (j === start) {
        if (this.conditionD(i, j)){
          matches.add(i + "," + j);
          match = true;
        }
      }
    }
  }
  return match;
};

Board.prototype.isValid = function (coordArray) {
  var tempBoard = new Board();

  for (var i = 0; i < this.board.length; i++) {
    for (var j = 0; j < this.board.length; j++) {
      var type = this.board[i][j].type;
      tempBoard.board[i][j] = new Gem(type);
    }
  }
  // tempBoard.board = this.board.slice();
  tempBoard.swapGems(coordArray);
  return tempBoard.match();
};

Board.prototype.clearGems = function () {
  var thisBoard = this.board;
  matches.forEach(function(item) {
    var coordinates=item.split(',');
    thisBoard[parseInt(coordinates[0])].splice(parseInt(coordinates[1]),1);
  });
  this.board = thisBoard;
};

Board.prototype.checkBoard = function () {
  while(this.match()) {
    this.match();
    this.clearGems();
    this.genGem(2);
  }
};

// User Interface Logic

function drawBoard(board) {
  // debugger;
  for (var i = 0; i < board.board.length; i++) {
    for (var j = 0; j < board.board.length; j++) {
      var cellID = '#' + i + '-' + j;
      // console.log(board.board[i][j].type);
      if (board.board[i][j].type === 'blue') {
        $(cellID).empty().append('<img src="img/blue.svg">');
       } else if (board.board[i][j].type === 'red') {
        $(cellID).empty().append('<img src="img/red.svg">');
      } else if (board.board[i][j].type === 'green') {
        $(cellID).empty().append('<img src="img/green.svg">');
      } else if (board.board[i][j].type === 'yellow') {
        $(cellID).empty().append('<img src="img/yellow.svg">');
      }
    }
  }
}

$(document).ready(function(){

  var newBoard = new Board();
  drawBoard(newBoard);

  $('.cell').click(function() {
    var userClick = $(this).attr('id');
    var gemCoords = userClick.split('-');
    var xCoord = parseInt(gemCoords[0]);
    var yCoord = parseInt(gemCoords[1]);



    if (coordArray.length === 0) {
      coordArray.push(xCoord,yCoord);
      console.log(coordArray);
      $(".cell").addClass("no-click");
      $(this).addClass("highlight");
      $("[id="+ xCoord + "-" + (yCoord + 1) + "]").addClass('highlight').removeClass("no-click");
      $("[id="+ xCoord + "-" + (yCoord - 1) + "]").addClass('highlight').removeClass("no-click");
      $("[id="+ (xCoord + 1) + "-" + yCoord + "]").addClass('highlight').removeClass("no-click");
      $("[id="+ (xCoord - 1) + "-" + yCoord + "]").addClass('highlight').removeClass("no-click");
    } else {
      coordArray.push(xCoord,yCoord);
      console.log(coordArray);

      if (newBoard.isValid(coordArray)) {
        debugger;
        newBoard.swapGems(coordArray);
        newBoard.checkBoard();
        // newBoard.clearGems();
        // newBoard.genGem(2);
        drawBoard(newBoard);

      } else {
        console.log(newBoard);
      }
      coordArray=[];
      $(".cell").removeClass("highlight");
      $(".cell").removeClass("no-click");
    }
  });

});
