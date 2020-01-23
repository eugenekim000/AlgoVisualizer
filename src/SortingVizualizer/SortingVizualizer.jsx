import React from 'react';
import './SortingVisualizer.css';
import {
  bubbleSortAnimations,
  insertionSortAnimations,
  selectionSortAnimations,
  heapSortAnimations
} from '../Algorithms/SortingAlgorithms.js';
const ANIMATION_SPEED_MS = 1;
const PRIMARY_COLOR = 'white';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      disabled: false,
      resetDisable: false,
      animationSpeed: 5
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.resetArray();
  }

  handleSubmit(number) {
    this.setState({
      animationSpeed: number
    });
  }

  handleChange(event) {
    this.setState({
      animationSpeed: event.target.value
    });
    console.log(this.state.animationSpeed);
  }

  randomIntInterval(min, max) {
    return Math.floor(Math.random() * (max - min - 1) + min);
  }

  resetArray() {
    const array = [];
    const arrayBars = document.getElementsByClassName('array-bars');

    for (let i = 0; i < 100; i++) {
      array.push(this.randomIntInterval(10, 400));
      if (arrayBars[i]) {
        arrayBars[i].style.backgroundColor = 'white';
      }
    }
    this.setState({ array });
    this.setState({ disabled: false });
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
        }, i * this.state.animationSpeed);

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
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          if (i % 3 !== 1) {
            let [barOneIdxSwap, barTwoIdxSwap] = Animations[i];
            let barOneStyle = arrayBars[barOneIdxSwap].style.height;
            let barTwoStyle = arrayBars[barTwoIdxSwap].style.height;
            arrayBars[barOneIdxSwap].style.height = barTwoStyle;
            arrayBars[barTwoIdxSwap].style.height = barOneStyle;
          }
        }, i * this.state.animationSpeed);
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async disableButtons(func, chosen) {
    this.setState({ resetDisable: true });
    this.setState({ disabled: true });
    if (chosen) {
      document.getElementsByClassName(chosen)[0].style.color = 'red';
    }
    let sort = func(this.state.array);
    this.sortingAnimations(sort);
    await this.delay(sort.length * this.state.animationSpeed);
    this.setState({ resetDisable: false });
    for (let i = 0; i < this.state.array.length; i++) {
      document.getElementsByClassName('array-bars')[i].style.backgroundColor =
        'deepskyblue';
      if (chosen) {
        document.getElementsByClassName(chosen)[0].style.color = 'lightgrey';
      }
    }
  }

  bubbleSort() {
    this.disableButtons(bubbleSortAnimations, 'Bubble');
  }

  insertionSort() {
    this.disableButtons(insertionSortAnimations, 'Insertion');
  }

  selectionSort() {
    this.disableButtons(selectionSortAnimations, 'Selection');
  }

  heapSort() {
    this.disableButtons(heapSortAnimations, 'Heap');
  }

  render() {
    const { array } = this.state;

    return (
      <div className='array-container'>
        <div>
          <h1>Sorting Visualizer.</h1>
          <form
            className='column player'
            onSubmit={number => this.handleSubmit(number)}
          >
            <div className='row user-inputs'>
              <input
                type='number'
                id='animationSpeed'
                className='input-light'
                placeholder='Enter Speed in Ms!'
                autoComplete='off'
                value={this.state.animationSpeed}
                onChange={this.handleChange}
              />
            </div>
          </form>
          <nav>
            <button
              onClick={() => this.resetArray()}
              disabled={this.state.resetDisable}
            >
              Generate New Array
            </button>
            <button
              className='Bubble'
              onClick={() => this.bubbleSort()}
              disabled={this.state.disabled}
            >
              Bubble Sort
            </button>
            <button
              className='Insertion'
              onClick={() => this.insertionSort()}
              disabled={this.state.disabled}
            >
              Insertion Sort
            </button>
            <button
              className='Selection'
              onClick={() => this.selectionSort()}
              disabled={this.state.disabled}
            >
              Selection Sort
            </button>
            <button
              className='Heap'
              onClick={() => this.heapSort()}
              disabled={this.state.disabled}
            >
              Heap Sort
            </button>
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
