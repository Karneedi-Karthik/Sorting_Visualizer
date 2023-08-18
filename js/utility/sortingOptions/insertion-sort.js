async function insertionSort() {

	let count = 1;
	const bars = document.querySelectorAll('.bar');
	bars.forEach(bar => bar.style.backgroundColor = `purple`);

	while(count < bars.length) {

		let i = count;

		while(i > 0) {
		
			bars[i].style.backgroundColor = `red`;
			bars[i-1].style.backgroundColor = `red`;

			await sleepForAnimation();

			if(parseInt(bars[i].style.height) < parseInt(bars[i-1].style.height)){			
				bars[i].style.backgroundColor = `greenyellow`;
				bars[i-1].style.backgroundColor = `greenyellow`;

				await sleepForAnimation();
				swapDomBars(bars,i,i-1);

				bars[i].style.backgroundColor = `purple`;
				bars[i-1].style.backgroundColor = `purple`;

				i = i-1;
			} else break;

		}

		for(let j = count-1 ; j >= 0 ; j--){
			await bubbleUpAfterSorted();
			bars[j].style.backgroundColor = `deepskyblue`;
		}
		count++;
	}
	bars[count-1].style.backgroundColor = `deepskyblue`;
	
	algorithmPopup.classList.remove('popOut');

	await animateSortingCompletion(bars);

	await waitForTime(1000);
	handleChangeSize();	
}

//insertion sort button event listener
insertionSortBtn.addEventListener('click', async () => {

	handleButtonStatus(insertionSortBtn);
	popOutIndicator(insertionSortBtn);
	algorithmPopup.innerHTML = insertionSortAlgo;
	await insertionSort();
	closePopOut(insertionSortBtn);
	handleButtonStatus(insertionSortBtn);
});

let insertionSortAlgo = 
`
	<h4> Insertion Sort </h4>

	<strong> Time Complexity : quadratic</strong>
	<strong>Colour Indication : </strong>

	<div class='algoclass'>
		<div class='rred'></div>
		<strong>Elements in compare state</strong>
	</div>
	<div class='algoclass'>
		<div class='ggreenyellow'></div>
		<strong>&nbsp &nbsp Elements in swap state</strong>
	</div>
	<div class='algoclass'>
		<div class='ddeepskyblue'></div>
		<strong>&nbsp &nbsp Sorted Elements</strong>
	</div>
`;