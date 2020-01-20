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
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
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
