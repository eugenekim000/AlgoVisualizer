export function bubbleSortAnimations(array) {
  let animations = [];
  let sorted = false;
  let counter = 0;
  let auxArray = array.slice();

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < auxArray.length - 1 - counter; i++) {
      animations.push([i, i + 1]);
      animations.push([i, i + 1]);
      if (auxArray[i] > auxArray[i + 1]) {
        swap(i, i + 1, auxArray);
        sorted = false;
        animations.push([i, i + 1]);
      } else {
        animations.push([]);
      }
    }
    counter++;
  }
  return animations;
}

export function insertionSortAnimations(array) {
  let animations = [];
  let auxArray = array.slice();

  for (let i = 1; i < auxArray.length; i++) {
    let j = i;
    if (j > 0 && auxArray[j] < auxArray[j - 1]) {
      while (j > 0 && auxArray[j] < auxArray[j - 1]) {
        animations.push([j, j - 1]);
        animations.push([j, j - 1]);
        swap(j, j - 1, auxArray);
        animations.push([j, j - 1]);
        j -= 1;
      }
    } else {
      if (j - 1 > 0) {
        animations.push([j, j - 1]);
        animations.push([j, j - 1]);
        animations.push([]);
      } else {
        animations.push([0, 0]);
        animations.push([0, 0]);
        animations.push([]);
      }
    }
  }
  return animations;
}

export function selectionSortAnimations(array) {
  let auxArray = array.slice();

  let animations = [];
  let startIdx = 0;
  while (startIdx < auxArray.length - 1) {
    let smallestIdx = startIdx;

    for (let i = startIdx + 1; i < auxArray.length; i++) {
      animations.push([startIdx, i]);
      animations.push([startIdx, i]);
      animations.push([]);

      if (auxArray[smallestIdx] > auxArray[i]) {
        smallestIdx = i;
      }
    }

    animations.push([]);
    animations.push([]);
    swap(startIdx, smallestIdx, auxArray);
    animations.push([startIdx, smallestIdx]);
    startIdx++;
  }
  return animations;
}

export function heapSortAnimations(array) {
  let auxArray = array.slice();
  let animations = [];
  buildMaxHeap(auxArray, animations);
  for (let endIdx = auxArray.length - 1; endIdx > 0; endIdx--) {
    animations.push([0, endIdx]);
    animations.push([0, endIdx]);
    swap(0, endIdx, auxArray);

    animations.push([0, endIdx]);

    siftDown(0, endIdx - 1, auxArray, animations);
  }
  return animations;
}

function buildMaxHeap(array, animations) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, array.length - 1, array, animations);
  }
}

function siftDown(currentIdx, endIdx, heap, animations) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
      idxToSwap = childTwoIdx;

      animations.push([currentIdx, idxToSwap]);
      animations.push([currentIdx, idxToSwap]);
    } else {
      idxToSwap = childOneIdx;

      animations.push([currentIdx, idxToSwap]);
      animations.push([currentIdx, idxToSwap]);
    }
    if (heap[idxToSwap] > heap[currentIdx]) {
      swap(currentIdx, idxToSwap, heap);
      animations.push([currentIdx, idxToSwap]);

      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      animations.push([]);

      return;
    }
  }
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
