//references
const sizeOfArray = document.querySelector('.arraySize');
const generateArrayButton = document.querySelector('.createArray');
const speedChangingButton = document.querySelector('.sortingSpeed');
const bars = document.querySelector('.bars');
const bubbleSortBtn = document.querySelector('.bubble-sort');
const insertionSortBtn = document.querySelector('.insertion-sort');
const selectionSortBtn = document.querySelector('.selection-sort');
const mergeSortBtn = document.querySelector('.merge-sort');
const quickSortBtn = document.querySelector('.quick-sort');
const algorithmPopup = document.querySelector('.algos');

document.querySelector('.arraySizeBtn').disabled = true;
document.querySelector('.sortingSpeedBtn').disabled = true;
//function declarations


//function to change status of a button
const changeStatusOfButton = (button) => {
	button.disabled = !button.disabled;
}

//function which changes status of buttons
const handleButtonStatus = (button) => {
	changeStatusOfButton(generateArrayButton);
	changeStatusOfButton(sizeOfArray);
	const buttons = document.querySelectorAll('.bouncy');

	for(let btn of buttons){
		if(btn === button)
		continue;
		changeStatusOfButton(btn);
	}
}

//function for popping out indicator
const popOutIndicator = (button) => {
	button.classList.add("btn-warning");
	button.classList.add("insortingProcess");
	algorithmPopup.classList.add("popOut");
}

const closePopOut = (button) => {
	button.classList.remove("insortingProcess");
	button.classList.remove("btn-warning");
	algorithmPopup.innerHTML = ``;
}

const getBars = () => {
	return document.querySelectorAll('.bar');
}

//function to create bars 
const createBars = (size = 30) => {

	//function to clear the existing bars
	bars.innerHTML = '';
	//creating a document fragment
	const fragment = document.createDocumentFragment();

	//creating bars of desired size
	for(let i = 0 ; i < size ; i++){

		//creating a div element on the document
		const bar = document.createElement('div');
		//assigning height to the bar
		const height = Math.floor(Math.random()*95+5);

		//adding the classname for further manipulation
		bar.className = 'bar';
		
		//setting the height and width attributes
		bar.style.height = `${height}%`;
		bar.style.width = `${3}%`;

		//setting the style of the bar
		bar.style.borderRadius = `10px`;
		bar.style.backgroundColor = 'white';

		//add the html only if it is not too congested
		if(size <= 53){
			bar.innerHTML = `${height}`;
		}

		//append the bar to the fragment
		fragment.append(bar);
	}

	//append the fragment to the main bars container
	bars.append(fragment);
}

//function to swap dom bars
const swapDomBars = (array,index1,index2) => {

	//getting the height attributes of the bars to be swapped
	let height1 = parseInt(array[index1].style.height);
	let height2 = parseInt(array[index2].style.height);

	//swapping the bar's height and inner text
	array[index1].style.height = `${height2}%`;
	array[index2].style.height = `${height1}%`;

	//adding the bar sizes after swapping
	array[index1].innerHTML = `${height2}`;
	array[index2].innerHTML = `${height1}`;

	//if overhead, then revert the bar heights from showing off
	if(array.length > 53){
		array[index1].innerHTML = ``;
		array[index2].innerHTML = ``;	
	}
}

//function to change dom bar with height(merge)
const changeHeightOfDomBar = (changeBar,changeBartoHeight) => {
	changeBar.style.height = `${changeBartoHeight}%`;
	changeBar.innerHTML = `${changeBartoHeight}`;
	if(sizeOfArray.value > 53){
		changeBar.innerHTML = ``;
	}
}

//function to compute the time Delay
const timeDelay = (value) => {
	//linear equation to solve matching
	// 2 on input corresponds to 500ms delay
	//50 on input corresponds to 1ms delay
	return Math.floor((-499/48)*value+(12499/24));
	// return Math.floor((-33/16)*value+(833/8));
}

//function to handle the change in size of array
const handleChangeSize = () => createBars(sizeOfArray.value);

//function which sleeps for certain amount of time
//for better animation
const sleepForAnimation = () => { 
	const milisec = timeDelay(speedChangingButton.value);
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec); 
    });
}

//function which sleeps for certain amount of time after 
//sorted for sorting animation
const bubbleUpAfterSorted = () => {
	return new Promise(resolve => {
		setTimeout(() => {resolve('')}, 100);
	});
}

//function which waits for our desired amount of time
const waitForTime = (time) => {
	return new Promise(resolve => {
		setTimeout(() => {resolve('')}, time);
	});
}

const animateSortingCompletion = async (bars) => {

	for(let i = 0 ; i < sizeOfArray.value ; i++){
		bars[i].classList.add('isSortedBar');
		await bubbleUpAfterSorted();
		bars[i].style.backgroundColor = `greenyellow`
		bars[i].classList.remove('isSortedBar');
	}
}

//function calls
createBars();

//event Listeners
sizeOfArray.addEventListener('input',handleChangeSize);
generateArrayButton.addEventListener('click',handleChangeSize);