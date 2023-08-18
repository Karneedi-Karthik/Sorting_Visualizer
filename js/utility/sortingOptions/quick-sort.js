
async function partition(bars,low,high,piObj){

	let pivot = parseInt(bars[high].style.height);
	bars[high].style.backgroundColor = `yellow`;
	let i = low - 1;

	for(let j = low ; j <= high ; j++){
		bars[j].style.backgroundColor = `red`;
		await sleepForAnimation();

		if(parseInt(bars[j].style.height) < pivot){
			i++;
			bars[j].style.backgroundColor = `greenyellow`;
			await sleepForAnimation();

			swapDomBars(bars,i,j);
			if(parseInt(bars[i].style.height) < pivot)
			bars[i].style.backgroundColor = `greenyellow`;
			if(parseInt(bars[j].style.height) < pivot)
			bars[j].style.backgroundColor = `greenyellow`;
			if(parseInt(bars[j].style.height) >= pivot)
			bars[j].style.backgroundColor = `red`;

		}
	}

	await sleepForAnimation();
	swapDomBars(bars,i+1,high);
	for(let itr = low ; itr <= i ; itr++)
	bars[itr].style.backgroundColor = `purple`;
	piObj.pi = i+1;
	for(let itr = i+1 ; itr <= high ; itr++)
	bars[itr].style.backgroundColor = `purple`;
}

async function quickSortHelper(bars,low,high){
	if(low >= high)
	return;
	let pi = {pi: 0};
	await partition(bars,low,high,pi);
	bars[pi.pi].style.backgroundColor = `deepskyblue`;
	await quickSortHelper(bars,low,pi.pi-1);
	await quickSortHelper(bars,pi.pi+1,high);
}

async function quickSort(){
	const bars = document.querySelectorAll('.bar');
	bars.forEach(bar => bar.style.backgroundColor = `purple`);

	await quickSortHelper(bars,0,parseInt(bars.length) - 1);


	for(let i = 0 ; i < sizeOfArray.value ; i++){
		bars[i].style.backgroundColor = `deepskyblue`;
	}

	algorithmPopup.classList.remove('popOut');

	await animateSortingCompletion(bars);

	await waitForTime(1000);
	handleChangeSize();
}

//quicksort button eventlistener
quickSortBtn.addEventListener('click', async () => {

	handleButtonStatus(quickSortBtn);
	popOutIndicator(quickSortBtn);
	algorithmPopup.innerHTML = quickSortAlgo;
	await quickSort();
	closePopOut(quickSortBtn);
	handleButtonStatus(quickSortBtn);

});


let quickSortAlgo = 
`
	<h4> Quick Sort </h4>

	<strong> Time Complexity : logarithmic </strong>
	<strong>Colour Indication : </strong>

	<div class='algoclass'>
		<div class='yyellow'></div>
		<strong>&nbsp Pivot</strong>
	</div>

	<div class='algoclass'>
		<div class='ggreenyellow'></div>
		<strong>&nbsp Smaller than pivot</strong>
	</div>

	<div class='algoclass'>
		<div class='rred'></div>
		<strong>&nbsp Greater than pivot</strong>
	</div>

	<div class='algoclass'>
		<div class='ddeepskyblue'></div>
		<strong>&nbsp Sorted Elements</strong>
	</div>
`;