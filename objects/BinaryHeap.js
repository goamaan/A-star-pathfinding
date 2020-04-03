// NOT USING ANYMORE! OLD IMPLEMENTATION, SEE MINHEAP.JS FOR NEW ONE

class BinaryHeap {
  constructor() {
    this.heap = [];
    this.length = this.heap.length;
  }

  getMin() {
    return this.heap[0];
  }

  includes(node) {
    for (let i = 0; i < this.heap.length; i++) {
      return this.heap[i] === node ? true : false;
    }
  }

  insert(node) {
    this.heap.push(node);
    //Finding correct pos. for node
    if (this.heap.length > 0) {
      let idx = this.heap.length - 1;

      //Traversing the heap
      while (
        idx > 0 &&
        this.heap[Math.floor((idx - 1) / 2)].f > this.heap[idx].f
      ) {
        //Using ES6 destructuring to swap node with parent
        [this.heap[Math.floor((idx - 1) / 2)], this.heap[idx]] = [
          this.heap[idx],
          this.heap[Math.floor((idx - 1) / 2)]
        ];
        idx = Math.floor((idx - 1) / 2);
      }
    }
  }

  remove() {
    //Smallest element is at index 1
    let min = this.heap[0];
    //replace smallest element with last element
    if (this.heap.length > 1) {
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.splice(this.heap.length - 1);

      if (this.heap.length === 2) {
        if (this.heap[0].f > this.heap[1].f) {
          [this.heap[0], this.heap[1]] = [this.heap[0], this.heap[1]];
        }
        return min;
      }

      //Array indexes of a tree representation
      let idx = 0;
      let leftIdx = idx * 2 + 1;
      let rightIdx = idx * 2 + 2;

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

        leftIdx = idx * 2 + 1;
        rightIdx = idx * 2 + 2;
      }
    } else if (this.heap.length === 1) {
      this.heap.splice(0, 1);
    } else {
      return null;
    }

    return min;
  }
}
