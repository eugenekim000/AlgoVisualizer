export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  let nodeDistance = node.distance;
  let prevNode = node;
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = nodeDistance + 1;
    nodeDistance += 1;
    neighbor.previousNode = prevNode;
    prevNode = neighbor;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  let tempRowUp = row;
  let tempRowDown = row;
  let tempColLeft = col;
  let tempColRight = col;

  while (tempRowDown > 0) {
    tempRowDown--;
    neighbors.push(grid[row - 1][col]);
  }
  while (tempColRight < grid[0].length - 1) {
    tempColRight++;
    neighbors.push(grid[row][col + 1]);
  }
  while (tempRowUp < grid.length - 1) {
    tempRowUp++;
    neighbors.push(grid[row + 1][col]);
  }
  while (tempColLeft > 0) {
    tempColLeft--;
    neighbors.push(grid[row][col - 1]);
  }

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function shortestPathDfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
