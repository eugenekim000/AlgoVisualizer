import React from 'react';
import './SortingVisualizer.css';

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
    for (let i = 0; i < 100; i++) {
      array.push(this.randomIntInterval(10, 1000));
    }
    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    return (
      <React.Fragment>
        {array.map((value, idx) => (
          <div className='array-bars' key={idx}>
            {value}
          </div>
        ))}
      </React.Fragment>
    );
  }
}
