import React, { Component } from 'react';
import Node from './Node/Node';
import {
  dijkstra,
  shortestPathOrderDijkstras
} from '../../Algorithms/Pathfinding/dijkstras.js';
import { dfs, shortestPathDfs } from '../../Algorithms/Pathfinding/dfs.js';
import { bfs, shortestPathBfs } from '../../Algorithms/Pathfinding/bfs.js';

const START_NODE_ROW = 7;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 7;
const FINISH_NODE_COL = 35; //35
const ROW_SIZE = 15;
const COL_SIZE = 40;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      gridWalls: [],
      mouseIsPressed: false
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid: grid.slice(), gridWalls: grid.slice() });
  }

  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  async animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      await setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }

    this.props.hasFinished();
  }

  async visualizeAlgo(algo, shortestPath) {
    this.props.setRunning();
    this.resetBoardWithWalls();
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = algo(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    await this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder);
    getInitialGrid();
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true, gridWalls: newGrid });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, gridWalls: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  resetBoardWithWalls() {
    const currentGrid = this.state.grid;
    const grid = [];
    for (let row = 0; row < ROW_SIZE; row++) {
      const currentRow = [];
      for (let col = 0; col < COL_SIZE; col++) {
        const node = currentGrid[row][col];
        const newNode = createNode(col, row);

        let hasWall = null;
        if (node.isWall) {
          hasWall = 'node-wall';
          newNode.isWall = !newNode.isWall;
        }
        document.getElementById(
          `node-${row}-${col}`
        ).className = `node null ${hasWall}`;

        currentRow.push(newNode);
      }
      grid.push(currentRow);
    }

    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = 'node node-start';

    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = 'node node-finish';

    this.setState({ grid });
  }

  clearBoard() {
    const grid = [];
    for (let row = 0; row < ROW_SIZE; row++) {
      const currentRow = [];
      for (let col = 0; col < COL_SIZE; col++) {
        document.getElementById(`node-${row}-${col}`).className = 'node null';
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }

    document.getElementById(
      `node-${START_NODE_ROW}-${START_NODE_COL}`
    ).className = 'node node-start';

    document.getElementById(
      `node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`
    ).className = 'node node-finish';

    this.setState({ grid });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.clearBoard()} disabled={this.props.running}>
          Clear Board
        </button>

        <button
          onClick={() =>
            this.visualizeAlgo(dijkstra, shortestPathOrderDijkstras)
          }
          disabled={this.props.running}
        >
          Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeDijkstra()} disabled={true}>
          A* Algorithm
        </button>
        <button
          onClick={() => this.visualizeAlgo(dfs, shortestPathDfs)}
          disabled={this.props.running}
          //disabled={true}
        >
          Depth first search
        </button>
        <button
          onClick={() => this.visualizeAlgo(bfs, shortestPathBfs)}
          disabled={this.props.running}
        >
          Breadth first search
        </button>
        <div className='grid'>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROW_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < COL_SIZE; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
