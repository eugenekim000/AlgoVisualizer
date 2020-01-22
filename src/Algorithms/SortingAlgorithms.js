export function bubbleSortAnimations(array) {
  let animations = [];
  let sorted = false;
  let counter = 0;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      animations.push([i, i + 1]);
      animations.push([i, i + 1]);
      if (array[i] > array[i + 1]) {
        swap(i, i + 1, array);
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
  for (let i = 1; i < array.length; i++) {
    let j = i;
    if (j > 0 && array[j] < array[j - 1]) {
      while (j > 0 && array[j] < array[j - 1]) {
        animations.push([j, j - 1]);
        animations.push([j, j - 1]);
        swap(j, j - 1, array);
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
  let animations = [];
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    let smallestIdx = startIdx;

    for (let i = startIdx + 1; i < array.length; i++) {
      animations.push([startIdx, i]);
      animations.push([startIdx, i]);
      animations.push([]);

      if (array[smallestIdx] > array[i]) {
        smallestIdx = i;
      }
    }

    animations.push([startIdx, smallestIdx]);
    animations.push([startIdx, smallestIdx]);
    swap(startIdx, smallestIdx, array);
    animations.push([startIdx, smallestIdx]);
    startIdx++;
  }
  return animations;
}

export function heapSortAnimations(array) {
  let animations = [];
  buildMaxHeap(array, animations);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    animations.push([0, endIdx]);
    animations.push([0, endIdx]);
    swap(0, endIdx, array);

    animations.push([0, endIdx]);

    siftDown(0, endIdx - 1, array, animations);
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
