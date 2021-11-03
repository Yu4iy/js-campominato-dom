const setBtn = document.querySelector('#set-dimensions')
const dimensionsLevel = document.querySelector('#dimensions')
const wrapGrid = document.querySelector('.wrap-grid')

setBtn.addEventListener('click', function(){
	console.log('test');
	wrapGrid.innerHTML = '';
	const gridLvl = dimensionsLevel.value

	let cellsNumber
	let cellsPerSide

	if(gridLvl === '1'){
			cellsNumber = 100;
			cellsPerSide = 10;
		}else if(gridLvl === '2'){
			cellsNumber = 81;
			cellsPerSide = 9;
		}else if(gridLvl === '3'){
			cellsNumber = 64;
			cellsPerSide = 8;
		}
		console.log(cellsNumber);
		console.log(cellsPerSide);



	const bombList = generateBobmbs(cellsNumber, 16)
	console.log('bombe generate ', bombList);
	// lista dei tetntativi /

	const attempts =[];
	const maxAttempts = cellsNumber - bombList.length	
	console.log('tentativi posibili', maxAttempts)



	const grid = document.createElement('div')
	grid.classList.add('grid');
	wrapGrid.append(grid)

	for(let i = 1; i < cellsNumber + 1; i++){
		const node = document.createElement('div');
		node.classList.add('square')
		grid.append(node)
		node.innerHTML += `${i}`
			node.addEventListener('click', function(){	
				 


				handleSquareClick(node, bombList, attempts, maxAttempts)



			})


		if(gridLvl === '1'){
			node.classList.add('lv1')
		}else if(gridLvl === '2'){
			node.classList.add('lv2')
		}else if(gridLvl === '3'){
			node.classList.add('lv3')
		}
		
	}	



})



// GEN LIST BOMBE
function generateBobmbs(totCells, totBombs){
	const bombs = [];
	while(bombs.length < totBombs){
		const bomb = getRandNumber (1, totCells)
		if(!bombs.includes(bomb)){
			bombs.push(bomb);
		}
	}
	return bombs;
}
// GEN NUMERO RANDOM 
function getRandNumber (min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function handleSquareClick(square, bombList, attempts, maxAttempts){
	const number = parseInt(square.innerHTML)
	console.log(number);
	if (bombList.includes(number)){
		console.log('bomba colpita');
		endGame(bombList, attempts, maxAttempts)
	}else if(!attempts.includes(number)){
		square.classList.add('safe');

		
		attempts.push(number)
		console.log(attempts);
		if(attempts.length === maxAttempts){
			console.log('hai vinto');
			endGame(bombList, attempts, maxAttempts)
		}
	}

 }
 //  ENDGAME 

function endGame(bombList, attempts, maxAttempts) {
	
	const squares = document.querySelectorAll('.square')
	console.log(squares);
	
	for(let i = 0; i < squares.length; i++){
		const square = squares[i]
		const squareValue = parseInt(square.innerHTML);

		if(bombList.includes(squareValue)){
			square.classList.add('bomb')
		}

	}
	let message = `Complimenti hai vinto! Hai indovinato i ${maxAttempts} tentativi validi.`
	if (attempts.length < maxAttempts) {
		message = `Peccato hai perso, box indovinto  ${attempts.length} `  
	}
	const messageEl = document.createElement('div');
	messageEl.classList.add('message', 'text-center')
	messageEl.append(message)
	document.querySelector('.wrap-grid').append(messageEl);

	document.querySelector('.grid').classList.add('end-game')	
}	