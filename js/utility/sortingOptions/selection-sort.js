async function selectionSort() {

	let count = 0;

	const bars = document.querySelectorAll('.bar');
	bars.forEach(bar => bar.style.backgroundColor = `purple`);	
	
	let lastsmallestIndex;

	while(count < bars.length - 1) {

		let smallestIndex = count;

		bars[count].style.backgroundColor = `greenyellow`;

		for(let i = count+1 ; i < bars.length ; i++) {
			bars[i].style.backgroundColor = `greenyellow`;
			await sleepForAnimation();

			if(parseInt(bars[smallestIndex].style.height) > parseInt(bars[i].style.height)) {

				smallestIndex = i;
				bars[smallestIndex].style.backgroundColor = `red`;

				if(lastsmallestIndex){
					bars[lastsmallestIndex].style.backgroundColor = `purple`;
				}
				lastsmallestIndex = smallestIndex
			}
			else
			bars[i].style.backgroundColor = `purple`;
		}

		bars[smallestIndex].style.backgroundColor = `red`;


		swapDomBars(bars,smallestIndex,count);
		bars[smallestIndex].style.backgroundColor = `purple`;
	
		bars[count].style.backgroundColor = `deepskyblue`;
		count++;
	}
	bars[count].style.backgroundColor = `deepskyblue`;

	for(let i = 0 ; i < sizeOfArray.value ; i++){
		bars[i].style.backgroundColor = `deepskyblue`;
	}

	algorithmPopup.classList.remove('popOut');

	await animateSortingCompletion(bars);

	await waitForTime(1000);
	handleChangeSize();
}

//selection sort button event listener
selectionSortBtn.addEventListener('click', async () => {

	handleButtonStatus(selectionSortBtn);
	popOutIndicator(selectionSortBtn);
	algorithmPopup.innerHTML = selectionSortAlgo;
	await selectionSort();
	closePopOut(selectionSortBtn);
	handleButtonStatus(selectionSortBtn);

});

let selectionSortAlgo = 
`
	<h4> Selection Sort </h4>

	<strong> Time Complexity : quadratic</strong>
	<strong>Colour Indication : </strong>

	<div class='algoclass'>
		<div class='rred'></div>
		<strong>&nbsp &nbsp Smallest element</strong>
	</div>

	<div class='algoclass'>
		<div class='ggreenyellow'></div>
		<strong>Elements in compare state</strong>
	</div>

	<div class='algoclass'>
		<div class='ddeepskyblue'></div>
		<strong>&nbsp &nbsp Sorted Elements</strong>
	</div>
`;