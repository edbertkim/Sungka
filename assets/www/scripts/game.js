//sungka v3
var canvas = document.getElementById('myCavas');
var context = canvas.getContext('2d');

var gameWidth = canvas.width;//930
var gameHeight = canvas.height;//500

//background
var background = new Image();
background.src = 'images/background.png';

//hand
var hand_open = new Image();
hand_open.src = 'images/hand_open.png';
var hand_close = new Image();
hand_close.src = 'images/hand_close.png';
var hand_width = 92;
var hand_height = 290;

var mouseX;
var mouseY;

var posX = 0;
var start, end, loop;

//game logic
/*                    PLayer Top   
 *             0   1   2   3   4   5   6
 *             o   o   o   o   o   o   o
 *    PB  O                                 O  PT
 *             o   o   o   o   o   o   o
 *            13  12  11  10   9   8   7
 *                   Player bottom
 * */

var choose;
var hand = 0;
var stop = false;
var turn;

var NUMHOLE = 14;

var player_top_score;
var player_bottom_score;
var player_top_turn = "top";
var player_bottom_turn = "bottom";

var hole = new Array();
var click = true;

var show;
var check = false;
function init() {
	
	player_top_score = 0;
	player_bottom_score = 0;

	for(var ctr=0;ctr<NUMHOLE;ctr++) {
		hole[ctr] = 7;
	}
	
	choose = -1;
	hand = 0;
	turn = player_bottom_turn;
	show = '';
	stop = false;
}


//game!
init();
function game() {
	loop = 0;
	if(turn == player_bottom_turn) {
		if(choose == 0)
			choose = 13;
		else if(choose == 1)
			choose = 12;
		else if(choose == 2)
			choose = 11;
		else if(choose == 3)
			choose = 10;
		else if(choose == 4)
			choose = 9;
		else if(choose == 5)
			choose = 8;
		else if(choose == 6)
			choose = 7;
		
		if(hole[choose] != 0) {
			start = choose;
			//alert("bottom |"+choose+"|");
			stop = false;
			while(choose != 14) {
				hand = hole[choose];
				hole[choose] = 0;
				loop_bottom();
				if(stop == true)
					break;
			}
			end = choose;
			if(end == 14)
				end = 13;
			/*
			for(var ctr=0;ctr<7;ctr++) {
				show += hole[ctr]+"-";
			}
			show += "\n";
			for(var ctr=13;ctr>6;ctr--) {
				show += hole[ctr]+"-";
			}
			alert(show);
			show = '';
			*/
			
			if(start == 0){
				animate(130, 225, start, end, loop);
			}
			if(start == 1){
				animate(225, 319, start, end, loop);
			}
			if(start == 2){
				animate(319, 416, start, end, loop);
			}
			if(start == 3){
				animate(416, 518, start, end, loop);
			}
			if(start == 4){
				animate(518, 615, start, end, loop);
			}
			if(start == 5){
				animate(615, 707, start, end, loop);
			}
			if(start == 6){
				animate(707, 0, start, end, loop);
			}
			//downward right to left
			if(start == 7){
				animate(707, 615, start, end, loop);
			}
			if(start == 8){
				animate(615, 518, start, end, loop);
			}
			if(start == 9){
				animate(518, 416, start, end, loop);
			}
			if(start == 10){
				animate(416, 319, start, end, loop);
			}
			if(start == 11){
				animate(319, 225, start, end, loop);
			}
			if(start == 12){
				animate(225, 130, start, end, loop);
			}
			if(start == 13){
				animate(130, 0, start, end, loop);
			}
			
			if(choose == 14)
				turn = player_bottom_turn;
			else if(stop == true)
				turn = player_top_turn;		
			
			choose = -1;
			hand = 0;
		}
		else {
			turn = player_bottom_turn;
			choose = -1;
			//alert("zero - bottom");
		}
	}
	else if(turn == player_top_turn) {
		if(hole[choose] != 0) {
			start = choose;
			//alert("top |"+choose+"|");
			stop = false;
			while(choose != -2) {
				hand = hole[choose];
				hole[choose] = 0;
				loop_top();
				if(stop == true)
					break;
			}
			end = choose;
			if(end == -2)
				end = 6;
			
			/*
			for(var ctr=0;ctr<7;ctr++) {
				show += hole[ctr]+"-";
			}
			show += "\n";
			for(var ctr=13;ctr>6;ctr--) {
				show += hole[ctr]+"-";
			}
			//alert(show);
			show = '';
			*/
			
			if(start == 0){
				animate(130, 225, start, end, loop);
			}
			if(start == 1){
				animate(225, 319, start, end, loop);
			}
			if(start == 2){
				animate(319, 416, start, end, loop);
			}
			if(start == 3){
				animate(416, 518, start, end, loop);
			}
			if(start == 4){
				animate(518, 615, start, end, loop);
			}
			if(start == 5){
				animate(615, 707, start, end, loop);
			}
			if(start == 6){
				animate(707, 0, start, end, loop);
			}
			//downward right to left
			if(start == 7){
				animate(707, 615, start, end, loop);
			}
			if(start == 8){
				animate(615, 518, start, end, loop);
			}
			if(start == 9){
				animate(518, 416, start, end, loop);
			}
			if(start == 10){
				animate(416, 319, start, end, loop);
			}
			if(start == 11){
				animate(319, 225, start, end, loop);
			}
			if(start == 12){
				animate(225, 130, start, end, loop);
			}
			if(start == 13){
				animate(130, 0, start, end, loop);
			}
			
			if(choose == -2)
				turn = player_top_turn;
			else if(stop == true)
				turn = player_bottom_turn;
				
			choose = -1;
			hand = 0;
		}
		else {
			turn = player_top_turn;
			choose = -1;
			//alert("zero - top");
		}
	}
	//alert("bottom: "+player_bottom_score+"\ntop: "+player_top_score);
}

function loop_bottom() {
	while(hand != 0) {
		choose = choose + 1;
		
		if(choose == 14)
			player_bottom_score = player_bottom_score + 1;
		else if(choose == 15) {
			choose = 0;
			loop = loop + 1;
		}
			
		if(choose != 14) {
			hole[choose] = hole[choose] + 1;
			if(hand == 1 && hole[choose] == 1)
				stop = true;
		}
		hand = hand - 1;
	}
}

function loop_top() {
	while(hand != 0) {
		choose = choose + 1;
		
		if(choose == 7) {
			hand = hand - 1;
			player_top_score = player_top_score + 1;
			if(hand == 0) {
				choose = -2;
				break;
			}
		}
		else if(choose == 14) {
			choose = 0;
			loop = loop + 1;
		}
		
		hole[choose] = hole[choose] + 1;
		if(hand == 1 && hole[choose] == 1)
			stop = true;
		
		hand = hand - 1;
	}
}

//load background
background.addEventListener('load', drawBg, false);


canvas.addEventListener('mousemove', function(evt) {
	if(click == true){
	  var mousePos = getMousePos(canvas, evt);
	  drawHand(canvas, mousePos.x);
	}
	}, false);

canvas.addEventListener("click", function (evt) {
	if(click == true){
		posX-=92;
		if(posX > 130 && posX < 225){
			choose = 0;
		}
		else if(posX > 225 && posX < 319){
			choose = 1;
		}
		else if(posX > 319 && posX < 416){
			choose = 2;
		}
		else if(posX > 416 && posX < 518){
			choose = 3;
		}
		else if(posX > 518 && posX < 615){
			choose = 4;
		}
		else if(posX > 615 && posX < 707){
			choose = 5;
		}
		else if(posX > 707 && posX < 799){
			choose = 6;
		}
		if(choose != -1)
			game();
	}
	}, false);

//for android
canvas.addEventListener('touchmove', function(evt) {
	  var touches = evt.changedTouches;
	  for (var i=0; i<touches.length; i++) {
		  mousePos = touches[i].pageX
	  }
	  drawHand(canvas, mousePos);
	}, false);

canvas.addEventListener("touchend", function (evt) {
	posX-=92;
	if(posX > 130 && posX < 225){
		choose = 0;
	}
	else if(posX > 225 && posX < 319){
		choose = 1;
	}
	else if(posX > 319 && posX < 416){
		choose = 2;
	}
	else if(posX > 416 && posX < 518){
		choose = 3;
	}
	else if(posX > 518 && posX < 615){
		choose = 4;
	}
	else if(posX > 615 && posX < 707){
		choose = 5;
	}
	else if(posX > 707 && posX < 799){
		choose = 6;
	}
	if(choose != -1)
		game();
}, false);
		
function drawHand(canvas, x) {
	var context = canvas.getContext('2d');
	context.drawImage(background, 0, 0, gameWidth, gameHeight);
	drawScore();
	if(turn == player_top_turn)
		context.drawImage(hand_open, x-130, 140, hand_width, hand_height);
	else if(turn == player_bottom_turn)
		context.drawImage(hand_open, x-130, 260, hand_width, hand_height);
	posX = x;
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.top - root.scrollTop;
	var mouseY = evt.clientY - rect.left - root.scrollLeft;

	return {
	  x: mouseX,
	  y: mouseY
	};
}
	  
var hand = {
	x: 700,
	y: 260
};

function drawBg(){
	context.drawImage(background, 0, 0, gameWidth, gameHeight);
	
	//animate(130, 615, 0, 12, 3);
}

function drawHand_open(x, y){
	context.drawImage(hand_open, x, 260, hand_width, hand_height);
}	

function drawScore(){
	context.font = "20pt Papyrus";
	context.fillStyle = "white";
	var bottom_score = player_bottom_score;
	var top_score = player_top_score;
	if(bottom_score<10)		bottom_score = "0" + bottom_score;
	if(top_score<10)		top_score = "0" + top_score;
	context.fillText(bottom_score, 90, 260);
	context.fillText(top_score, 810, 260);
	
	context.fillText(hole[0], 155, 200);
	context.fillText(hole[1], 255, 200);
	context.fillText(hole[2], 353, 200);
	context.fillText(hole[3], 452, 200);
	context.fillText(hole[4], 550, 200);
	context.fillText(hole[5], 647, 200);
	context.fillText(hole[6], 747, 200);
	context.fillText(hole[13], 155, 320);
	context.fillText(hole[12], 255, 320);
	context.fillText(hole[11], 353, 320);
	context.fillText(hole[10], 452, 320);
	context.fillText(hole[9], 550, 320);
	context.fillText(hole[8], 647, 320);
	context.fillText(hole[7], 747, 320);
	
	context.font = "10pt Courier";
	context.fillStyle = "black";
	context.fillText("Arana Bros. & Patenio", 750, 20);
}

function test(){
	//upward left to right
		
		if(start == 0){
			animate(130, 225, start, end, loop);
		}
		if(start == 1){
			animate(225, 319, start, end, loop);
		}
		if(start == 2){
			animate(319, 416, start, end, loop);
		}
		if(start == 3){
			animate(416, 518, start, end, loop);
		}
		if(start == 4){
			animate(518, 615, start, end, loop);
		}
		if(start == 5){
			animate(615, 707, start, end, loop);
		}
		if(start == 6){
			animate(707, 0, start, end, loop);
		}
		//downward right to left
		if(start == 7){
			animate(707, 615, start, end, loop);
		}
		if(start == 8){
			animate(615, 518, start, end, loop);
		}
		if(start == 9){
			animate(518, 416, start, end, loop);
		}
		if(start == 10){
			animate(416, 319, start, end, loop);
		}
		if(start == 11){
			animate(319, 225, start, end, loop);
		}
		if(start == 12){
			animate(225, 130, start, end, loop);
		}
		if(start == 13){
			animate(130, 0, start, end, loop);
		}
}

var check = false;

function animate(x, y, start, end, loop){
	if(loop!=0 || start!=end){
		click = false;
		//upward left to right
		if((start >= 7 && start <= 13 && x < y) || (start >= 0 && start <= 6 && x > y)){
			if(start == 0){
				x = 130;
				y = 225;
			}
			if(start == 1){
				x = 225;
				y = 319;
			}
			if(start == 2){
				x = 319;
				y = 416;
			}
			if(start == 3){
				x = 416;
				y = 518;
			}
			if(start == 4){
				x = 518;
				y = 615;
			}
			if(start == 5){
				x = 615;
				y = 707;
			}
			if(start == 6){
				x = 707;
			}
			//downward right to left
			if(start == 7){
				x = 707;
				y = 615;
			}
			if(start == 8){
				x = 615;
				y = 518;
			}
			if(start == 9){
				x = 518;
				y = 416;
			}
			if(start == 10){
				x = 416;
				y = 319;
			}
			if(start == 11){
				x = 319;
				y = 225;
			}
			if(start == 12){
				x = 225;
				y = 130;
			}
			if(start == 13){
				x = 130;
			}
		}
		
		context.save();
		context.drawImage(background, 0, 0, gameWidth, gameHeight);
		drawScore();
		if((start >= 7 && start <= 13) && y <= x && x <= (y+50))
			context.drawImage(hand_close, x, 260, hand_width, hand_height);
		else if((start >= 7 && start <= 13))
			context.drawImage(hand_open, x, 260, hand_width, hand_height);
			
		if((start >= 0 && start <= 6) && y >= x && x >= (y-50))
			context.drawImage(hand_close, x, 140, hand_width, hand_height);
		else if((start >= 0 && start <= 6))
			context.drawImage(hand_open, x, 140, hand_width, hand_height);
		
		context.restore(); 
		
		if(start >= 7 && start <= 13)
				x -= 5;
		else if(start >= 0 && start <= 6)
				x += 5;
		
		if((start >= 7 && start <= 13 && x < y) || (start >= 0 && start <= 6 && x > y)){
			
			start = start + 1;
			
			/////////////////////////////////???????////////////////////&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
			
			if(start == 14){
				start=0;
				x = 130;
				y = 225;
				loop = loop - 1;
			}
			//alert(	"start: " + start + "\n" +		"end: " + end + "\n" +	"loop: " + loop + "\n" );
		}
		
		var loopTimer = setTimeout('animate('+x+','+y+','+start+','+end+','+loop+')',5);
	}else{
		click = true;
	}
}