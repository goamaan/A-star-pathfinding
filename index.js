// Global Scope
const cols = 30;
const rows = 30;
let grid = new Array(cols);

// A* variables
let openSet = new MinHeap();
let closedSet = [];
let w, h;
let start, end;
let path = [];
let current;

function heuristic(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

function setup() {
  createCanvas(600, 600);

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
  start.obs = false;
  end.obs = false;
  openSet.add(start);
}

function draw() {
  if (openSet.count > 0) {
    //Remove from openSet and add to closedSet
    current = openSet.remove();
    closedSet.push(current);

    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    //Check all neighbors
    for (let i = 0; i < current.neighbors.length; i++) {
      let neighbor = current.neighbors[i];

      //Check if next spot is valid
      if (closedSet.includes(neighbor) || neighbor.obs) {
        continue;
      }
      let tempG = current.g + heuristic(neighbor, current);

      //If new path is better, use it
      // let newPath = false;
      // if (openSet.includes(neighbor)) {
      //   if (tempG < neighbor.g) {
      //     neighbor.g = tempG;
      //     newPath = true;
      //   }
      // } else {
      //   neighbor.g = tempG;
      //   newPath = true;
      //   openSet.add(neighbor);
      // }
      if (tempG < neighbor.g || !openSet.includes(neighbor)) {
        neighbor.g = tempG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.parent = current;
        neighbor.f = neighbor.g + neighbor.h;
        if (!openSet.includes(neighbor)) {
          openSet.add(neighbor);
        }
      }

      //New path is better

      // if (newPath) {
      //   neighbor.h = heuristic(neighbor, end);
      //   neighbor.f = neighbor.g + neighbor.h;
      //   neighbor.parent = current;
      // }
    }
  } else {
    console.log("no solution");
    noLoop();
    return;
  }

  // Draw current state of everything
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0, 50));
  }

  for (var i = 0; i < openSet.heap.length; i++) {
    openSet.heap[i].show(color(0, 255, 0, 50));
  }

  // Find the path by working backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }

  //   for (var i = 0; i < path.length; i++) {
  //     path[i].show(color(0, 0, 255));
  //   }

  //Drawing path as continuous line
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 4);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
  }
  endShape();
}
