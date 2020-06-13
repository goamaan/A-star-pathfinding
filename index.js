// Global Scope
const cols = 50;
const rows = 50;
let grid = new Array(cols);

// A* variables
let openSet = new MinHeap();
let closedSet = [];
let w, h;
let start, end;
let path = [];
let current;
let cnv;

function heuristic(a, b) {
  return dist(a.x, a.y, b.x, b.y);
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setupMap() {
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
  start.start = true;
  end.end = true;
  openSet.add(start);
}

function Astar() {
  if (openSet.count > 0) {
    //Remove from openSet and add to closedSet
    current = openSet.remove();
    closedSet.push(current);

    if (current === end) {
      noLoop();
      console.log('DONE!');
      div = createDiv('<p>Solved!</p>');
      div.position(window.innerWidth / 2 - 20, window.innerHeight - 100);
    }

    //Check all neighbors
    for (let i = 0; i < current.neighbors.length; i++) {
      let neighbor = current.neighbors[i];

      //Check if next spot is valid
      if (closedSet.includes(neighbor) || neighbor.obs) {
        continue;
      }

      let tempG = current.g + heuristic(neighbor, current);

      if (tempG < neighbor.g || !openSet.includes(neighbor)) {
        neighbor.g = tempG;
        neighbor.h = heuristic(neighbor, end);
        neighbor.parent = current;
        neighbor.f = neighbor.g + neighbor.h;
        if (!openSet.includes(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  } else {
    console.log('No Solution!');
    noLoop();
    div = createDiv('<p>No Solution!</p>');
    div.position(window.innerWidth / 2 - 20, window.innerHeight - 100);
    return;
  }
}

function drawMap() {
  // Draw current state of everything
  background((36, 36, 36));

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color('#FFA9E7'));
  }

  for (var i = 0; i < openSet.heap.length; i++) {
    openSet.heap[i].show(color('#A049ED'));
  }
}

function drawPath() {
  // Find the path by going backwards
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }

  // for (var i = 0; i < path.length; i++) {
  //   path[i].show(color(0, 0, 255));
  // }

  // Drawing path as continuous line
  noFill();
  stroke('#21FF3B');
  strokeWeight(w / 4);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    curveVertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
  }
  endShape();
}

function setup() {
  cnv = createCanvas(600, 600);
  cnv.parent('container');
  centerCanvas();
  setupMap();
  //   button = createButton("Reset");
  //   button.position(19, 19);
  //   button.mousePressed(() => {
  //     clear();
  //     setup();
  //     draw();
  //     loop();
  //     noLoop();
  //   });
}

function draw() {
  Astar();
  drawMap();
  drawPath();
}
