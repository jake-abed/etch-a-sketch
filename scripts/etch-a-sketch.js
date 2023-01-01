'use strict';
function allBlackFill() {
	return this.setAttribute('style', 'background-color: black');
}
//Declare settings object, with 'mode' property and 'squaresPerSide'
const settings = {
	mode: allBlackFill,
	squaresPerSide: 16
}
//Declare variables to store DOM nodes.
const screenNode = document.querySelector('.etch-a-sketch-screen'),
	resetButton = document.querySelector('.reset-button');
//Fill .etch-a-sketch-screen div with X * X square divs, X being settings.squaresPerSide
const fillScreen = (sideLength) => {
	const TOTAL_DIVS = sideLength * sideLength;
	screenNode.setAttribute('style', `grid-template-columns: repeat(${sideLength}, 1fr);`);
	for (let i = 0; i < TOTAL_DIVS; i++){
		const pixelDiv = document.createElement('div');
		pixelDiv.setAttribute('id', `div-${i}`);
		pixelDiv.setAttribute('class', 'pixel-div');
		pixelDiv.addEventListener('pointerover', settings.mode);
		pixelDiv.addEventListener('touch', settings.mode);
		screenNode.append(pixelDiv);
	}
}
//Assign 'hover' event listeners to each pixel that run a fill function, settings.mode's current assignment.
//When user clicks reset function, the divs are deleted and the etch-a-sketch reinits per specs.

//finally, init the etch-a-sketch toy
fillScreen(settings.squaresPerSide);