async function merge(bars, left, mid, right) {
    let temp_bars = [];
    let i = left,
      j = mid + 1,
      k = left;
  
    for (let itr1 = left; itr1 <= mid; itr1++) {
      bars[itr1].style.backgroundColor = `deepskyblue`;
    }
    for (let itr2 = mid + 1; itr2 <= right; itr2++) {
      bars[itr2].style.backgroundColor = `coral`;
    }
  
    while (i <= mid && j <= right) {
      if (parseInt(bars[i].style.height) < parseInt(bars[j].style.height)) {
        temp_bars.push(parseInt(bars[i].style.height));
        i++;
      } else {
        temp_bars.push(parseInt(bars[j].style.height));
        j++;
      }
    }
    while (i <= mid) {
      temp_bars.push(parseInt(bars[i].style.height));
      i++;
    }
    while (j <= right) {
      temp_bars.push(parseInt(bars[j].style.height));
      j++;
    }
    for (let i = 0; i < temp_bars.length; i++) {
      await sleepForAnimation();
      changeHeightOfDomBar(bars[k++], temp_bars[i]);
    }
    await sleepForAnimation();
  
    for (let itr1 = left; itr1 <= mid; itr1++) {
      bars[itr1].style.backgroundColor = `purple`;
    }
    for (let itr2 = mid + 1; itr2 <= right; itr2++) {
      bars[itr2].style.backgroundColor = `purple`;
    }
  }
  
  async function mergeSortHelper(bars, left, right) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSortHelper(bars, left, mid);
    await mergeSortHelper(bars, mid + 1, right);
    await merge(bars, left, mid, right);
  }
  
  async function mergeSort() {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => (bar.style.backgroundColor = `purple`));
  
    let start = 0;
    let end = sizeOfArray.value - 1;
  
    await mergeSortHelper(bars, start, end);
  
    algorithmPopup.classList.remove("popOut");
  
    await animateSortingCompletion(bars);
  
    await waitForTime(1000);
    handleChangeSize();
  }
  
  //mergesort button event listener
  mergeSortBtn.addEventListener("click", async () => {
  
    handleButtonStatus(mergeSortBtn);
    popOutIndicator(mergeSortBtn);
    algorithmPopup.innerHTML = mergeSortAlgo;
    await mergeSort();
    closePopOut(mergeSortBtn);
    handleButtonStatus(mergeSortBtn);
  });
  
  let mergeSortAlgo = `
      <h4> Merge Sort </h4>
  
      <strong> Time Complexity : logarithmic</strong>
      <strong>Colour Indication : </strong>
  
      <div class='algoclass'>
          <div class='ddeepskyblue'></div>
          <strong>&nbsp Left partition</strong>
      </div>
  
      <div class='algoclass'>
          <div class='ccoral'></div>
          <strong>&nbsp Right partition</strong>
      </div>
  
      <div class='algoclass'>
          <div class='ggreenyellow'></div>
          <strong>&nbsp Sorted Element</strong>
      </div>
  `;