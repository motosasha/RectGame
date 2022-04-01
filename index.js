'use strict';

let $startButton = document.querySelector('#start');
let $gameField = document.querySelector('#game');
let $time = document.querySelector('#time');
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result');
let $gameTime = document.querySelector('#game-time');

let gameScore = 0;
let isGameStarted = false;

$startButton.addEventListener('click', startGame);
$gameField.addEventListener('click', handleRectClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
	$el.classList.remove('hide')
}
function hide($el) {
	$el.classList.add('hide')
}

function startGame() {
	gameScore = 0;
	setGameTime();
	$gameTime.setAttribute('disabled', 'true')
	isGameStarted = true;
	hide($startButton);
	$gameField.style.background = '#fff';

	let round = setInterval(function () {
		let time = parseFloat($time.textContent);

		if (time <= 0) {
			clearInterval(round);
			endGame();
		}
		else {
			$time.textContent = (time - 0.1).toFixed(1);
		}
	}, 100)

	rectGenerator();
}

function endGame() {
	isGameStarted = false;
	setGameScore();
	$gameTime.removeAttribute('disabled')
	show($startButton);
	$gameField.innerHTML = '';
	$gameField.style.background = '#ccc';
	show($resultHeader);
	hide($timeHeader);
}

function rectGenerator() {
	$gameField.innerHTML = '';

	let rect = document.createElement('div');
	let rectSize = randomizer(30, 100);
	let gameFieldSize = $gameField.getBoundingClientRect();
	let maxTop = gameFieldSize.height - rectSize;
	let maxLeft = gameFieldSize.width - rectSize;
	let randomColor = 'rgb(' + randomizer(0, 255) + ',' + randomizer(0, 255) + ',' + randomizer(0, 255) + ')';

	rect.style.height = rect.style.width = rectSize + 'px';
	rect.style.position = 'absolute';
	rect.style.background = randomColor;
	rect.style.top = randomizer(0, maxTop) + 'px';
	rect.style.left = randomizer(0, maxLeft) + 'px';
	rect.style.cursor = 'pointer';
	rect.setAttribute('data-rect', 'true')

	$gameField.insertAdjacentElement("afterbegin", rect)
}

function setGameScore() {
	$result.textContent = gameScore.toString();
}

function setGameTime() {
	let time = parseInt($gameTime.value);
	if (time < 5) $gameTime.value = 5; //todo сделать нормально время в заголовке
	$time.textContent = time.toFixed(1)
	show($timeHeader);
	hide($resultHeader);
}

function randomizer(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function boxColorRandomizer() {return "#" + Math.random().toString(16).slice(2,8);}

console.log(boxColorRandomizer())

function handleRectClick(event) {
	if (!isGameStarted) {
		return
	}

	if (event.target.dataset.rect) {
		gameScore++;
		rectGenerator();
	}
}