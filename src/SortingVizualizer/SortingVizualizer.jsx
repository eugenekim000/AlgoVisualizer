import React from 'react';
import './SortingVisualizer.css';
import { bubbleSortAnimations } from '../Algorithms/SortingAlgorithms.js';
const ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = 'pink';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
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

  /*  bubbleSort() {
    const animations = bubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bars');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  } */

  bubbleSort() {
    const Animations = bubbleSortAnimations(this.state.array);

    for (let i = 0; i < Animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bars');
      if (Animations[i] == '') {
        continue;
      }
      let [barOneIdx, barTwoIdx] = Animations[i];
      let barOneStyle = arrayBars[barOneIdx].style;
      let barTwoStyle = arrayBars[barTwoIdx].style;
      const colorChange = i % 3 !== 2;

      if (colorChange) {
        const color = i % 3 === 0 ? 'red' : 'pink';
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

  render() {
    const { array } = this.state;

    return (
      <div className='array-container'>
        {array.map((value, idx) => (
          <div
            className='array-bars'
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <div>
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
      </div>
    );
  }
}
