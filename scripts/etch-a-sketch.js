'use strict';
//Get Random number helper function
const randomNumberUpTo = (maxVal) => Math.floor(Math.random()*maxVal+1);
const allBlackFill = () => 'background-color: black';
function randomColorFill() {
	const redVal = randomNumberUpTo(256);
	const greenVal = randomNumberUpTo(256);
	const blueVal = randomNumberUpTo(256);
	return  `background-color: rgb(${redVal}, ${greenVal}, ${blueVal});`;
}
const fillPixel = (pixel) => {
	return pixel.setAttribute('style', settings.mode());
}
//Declare settings object, with 'mode' property and 'squaresPerSide'
const settings = {
	mode: randomColorFill,
	squaresPerSide: 16
}
//Declare variables to store DOM nodes.
const screenNode = document.querySelector('.etch-a-sketch-screen'),
	resetButton = document.querySelector('.reset'),
	resizeButton = document.querySelector('.resize'),
	allBlackButton = document.querySelector('.all-black'),
	rainbowFillButton = document.querySelector('.rainbow-fill');
//Fill .etch-a-sketch-screen div with X * X square divs, X being settings.squaresPerSide
const fillScreen = (sideLength) => {
	const TOTAL_DIVS = sideLength * sideLength;
	screenNode.setAttribute('style', `grid-template-columns: repeat(${sideLength}, 1fr);`);
	for (let i = 0; i < TOTAL_DIVS; i++){
		const pixelDiv = document.createElement('div');
		pixelDiv.setAttribute('id', `div-${i}`);
		pixelDiv.setAttribute('class', 'pixel-div');
		pixelDiv.addEventListener('pointerenter', (event) => {
			if (event.buttons == 1) fillPixel(pixelDiv);
		});
		screenNode.append(pixelDiv);
	}
}
//swap modes helper function
const swapFillMode = (mode) => {
	settings.previousMode = settings.mode;
	settings.mode = mode;
}
//When user clicks reset function, the divs are deleted and the etch-a-sketch reinits per specs.
const resetScreen = () => {
	document.querySelectorAll('.pixel-div').forEach(pixel => pixel.remove());
	fillScreen(settings.squaresPerSide);
	return console.log('Screen Reset');
}
//Helper function for user input to change screen pixel density
const resizeScreen = () => {
	settings.squaresPerSide = prompt('How many pixels would you like per side? Please input a number less than or equal to 64.', 16).toString();
	if (settings.squaresPerSide > 64) {
		alert('Can you read? I said less than or equal to 64.');
		settings.squaresPerSide = 64;
	}
	resetScreen();
}
//finally, init the etch-a-sketch toy
allBlackButton.addEventListener('pointerdown', () => swapFillMode(allBlackFill));
rainbowFillButton.addEventListener('pointerdown', () => swapFillMode(randomColorFill));
resetButton.addEventListener('pointerdown', resetScreen);
resizeButton.addEventListener('pointerdown', resizeScreen);
fillScreen(settings.squaresPerSide);