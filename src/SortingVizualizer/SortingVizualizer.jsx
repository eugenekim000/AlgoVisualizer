import React from 'react';
import './SortingVisualizer.css';
import {
  bubbleSortAnimations,
  insertionSortAnimations,
  selectionSortAnimations,
  heapSortAnimations
} from '../Algorithms/SortingAlgorithms.js';
const ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = 'pink';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      disabled: false
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  randomIntInterval(min, max) {
    return Math.floor(Math.random() * (max - min - 1) + min);
  }

  resetArray() {
    const array = [];
    const arrayBars = document.getElementsByClassName('array-bars');

    for (let i = 0; i < 100; i++) {
      array.push(this.randomIntInterval(10, 500));
      if (arrayBars[i]) {
        arrayBars[i].style.backgroundColor = 'pink';
      }
    }

    this.setState({ array });
  }

  sortingAnimations(Animations) {
    for (let i = 0; i < Animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bars');
      if (Animations[i] == '') {
        continue;
      }

      if (Animations[i].length === 3) {
        let [barOneIdx, barTwoIdx] = Animations[i];
        let barOneStyle = arrayBars[barOneIdx].style;
        let barTwoStyle = arrayBars[barTwoIdx].style;

        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);

        continue;
      }

      let [barOneIdx, barTwoIdx] = Animations[i];
      let barOneStyle = arrayBars[barOneIdx].style;
      let barTwoStyle = arrayBars[barTwoIdx].style;
      const colorChange = i % 3 !== 2;

      if (colorChange) {
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          if (i % 3 !== 1) {
            let [barOneIdxSwap, barTwoIdxSwap] = Animations[i];
            let barOneStyle = arrayBars[barOneIdxSwap].style.height;
            let barTwoStyle = arrayBars[barTwoIdxSwap].style.height;
            arrayBars[barOneIdxSwap].style.height = barTwoStyle;
            arrayBars[barTwoIdxSwap].style.height = barOneStyle;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async bubbleSort() {
    this.setState({ disabled: true });

    const Animations = bubbleSortAnimations(this.state.array);
    console.log(Animations);
    this.sortingAnimations(Animations);
    await this.delay(Animations.length * ANIMATION_SPEED_MS);
    this.setState({ disabled: false });
  }

  insertionSort() {
    const Animations = insertionSortAnimations(this.state.array);
    this.sortingAnimations(Animations);
  }

  selectionSort() {
    const Animations = selectionSortAnimations(this.state.array);
    this.sortingAnimations(Animations);
  }

  heapSort() {
    const Animations = heapSortAnimations(this.state.array);
    this.sortingAnimations(Animations);
  }

  test() {
    this.setState({ disabled: !this.state.disabled });
  }

  render() {
    const { array } = this.state;

    return (
      <div className='array-container'>
        <div>
          <h1>Sorting Visualizer!</h1>
          <nav>
            <button
              onClick={() => this.resetArray()}
              disabled={this.state.disabled}
            >
              Generate New Array
            </button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button onClick={() => this.insertionSort()}>Insertion Sort</button>
            <button onClick={() => this.selectionSort()}>Selection Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.test()}>test</button>
          </nav>
        </div>

        {array.map((value, idx) => (
          <div
            className='array-bars'
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    );
  }
}
