//Starting min-heap at index 1 to avoid complex calculations

class BinaryHeap {
  constructor() {
    this.heap = [null];
    this.length = this.heap.length;
  }

  getMin() {
    return this.heap[1];
  }

  bubbleUp() {
    //Finding correct pos. for node
    if (this.heap.length > 1) {
      let idx = this.heap.length - 1;

      //Traversing the heap
      while (idx > 1 && this.heap[Math.floor(idx / 2)].f > this.heap[idx].f) {
        //Using ES6 destructuring to swap node with parent
        [this.heap[Math.floor(idx / 2)], this.heap[idx]] = [
          this.heap[idx],
          this.heap[Math.floor(idx / 2)]
        ];
        idx = Math.floor(idx / 2);
      }
    }
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  sinkDown(min) {
    //replace smallest element with last element
    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1];
      this.heap.splice(this.heap.length - 1);

      if (this.heap.length === 3) {
        if (this.heap[1].f > this.heap[2].f) {
          [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
        }
        return min;
      }

      //Array indexes of a tree representation
      let idx = 1;
      let leftIdx = idx * 2;
      let rightIdx = idx * 2 + 1;

      while (
        this.heap[leftIdx] &&
        this.heap[rightIdx] &&
        (this.heap[idx].f < this.heap[leftIdx].f ||
          this.heap[idx].f < this.heap[rightIdx].f)
      ) {
        if (this.heap[leftIdx].f < this.heap[rightIdx].f) {
          [this.heap[idx], this.heap[leftIdx]] = [
            this.heap[leftIdx],
            this.heap[idx]
          ];
          idx = leftIdx;
        } else {
          [this.heap[idx], this.heap[rightIdx]] = [
            this.heap[rightIdx],
            this.heap[idx]
          ];
          idx = rightIdx;
        }

        leftIdx = idx * 2;
        rightIdx = idx * 2 + 1;
      }
    } else if (this.heap.length === 2) {
      this.heap.splice(1, 1);
    } else {
      return null;
    }

    return min;
  }

  remove() {
    //Smallest element is at index 1
    let min = this.heap[1];
    this.sinkDown(min);
  }
}
