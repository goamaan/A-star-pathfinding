// Global Scope
const cols = 50;
const rows = 50;
let grid = new Array(cols);

// A* variables
let openSet = new BinaryHeap();
let closedSet = [];
let w, h;
let start, end;
let path = [];

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
}

function setup() {
  createCanvas(600, 600);
  console.log("A*");

  // Grid cell size
  w = width / cols;
  h = height / rows;

  //Making the map (2D Array)
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Node(i, j);
    }
  }

  // Add neighbors for each node
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;
  openSet.insert(start);
}

function draw() {}
