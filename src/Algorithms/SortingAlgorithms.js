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
    animations.push([startIdx, smallestIdx]);
    animations.push([startIdx, smallestIdx]);

    for (let i = startIdx + 1; i < array.length; i++) {
      if (array[smallestIdx] > array[i]) smallestIdx = i;
    }
    swap(startIdx, smallestIdx, array);
    animations.push([startIdx, smallestIdx]);
    startIdx++;
  }
  return animations;
}

export function quickSortAnimations(array) {}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
