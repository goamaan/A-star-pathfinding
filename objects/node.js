class Node {
  constructor(i, j) {
    //Location
    this.x = i;
    this.y = j;
    //f,g,h values
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.heapIndex;
    //Neighbors
    this.neighbors = [];
    //Previous node to trace path
    this.parent;
    //Is this Node an obstacle?
    this.obs = false;
    if (random(1) < 0.3) {
      this.obs = true;
    }
    this.start = false;
    this.end = false;
  }

  //Compare to other
  compareTo(node) {
    let compare = this.f - node.f;
    if (compare === 0) {
      compare = this.h - node.h;
    }
    return compare * -1;
  }

  // Display Node
  show(col) {
    if (this.obs) {
      fill("black");
      noStroke();
      ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 1.4, h / 1.4);
    } else if (col) {
      fill(col);
      ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, h / 2);
    } else if (this.start) {
      fill(0, 255, 0);
      rect(this.x * w, this.y * h, w, h);
    } else if (this.end) {
      fill(255, 0, 0);
      rect(this.x * w, this.y * h, w, h);
    }
  }

  addNeighbors(grid) {
    const x = this.x;
    const y = this.y;

    if (x < cols - 1) {
      this.neighbors.push(grid[x + 1][y]);
    }
    if (x > 0) {
      this.neighbors.push(grid[x - 1][y]);
    }
    if (y < rows - 1) {
      this.neighbors.push(grid[x][y + 1]);
    }
    if (y > 0) {
      this.neighbors.push(grid[x][y - 1]);
    }
    if (x > 0 && y > 0) {
      this.neighbors.push(grid[x - 1][y - 1]);
    }
    if (x < cols - 1 && y > 0) {
      this.neighbors.push(grid[x + 1][y - 1]);
    }
    if (x > 0 && y < rows - 1) {
      this.neighbors.push(grid[x - 1][y + 1]);
    }
    if (x < cols - 1 && y < rows - 1) {
      this.neighbors.push(grid[x + 1][y + 1]);
    }
  }
}
