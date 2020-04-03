class MinHeap {
  constructor() {
    this.heap = [];
    this.count = 0;
  }
  add(item) {
    item.heapIndex = this.count;
    this.heap[this.count] = item;
    this.bubbleUp(item);
    this.count++;
  }
  bubbleUp(item) {
    let parentIdx = (item.heapIndex - 1) / 2;

    while (true) {
      let parent = this.heap[parentIdx];
      if (parent === undefined) {
        break;
      }
      if (item.compareTo(parent) > 0) {
        this.swap(item, parent);
      } else {
        break;
      }
      parentIdx = (item.heapIndex - 1) / 2;
    }
  }

  swap(a, b) {
    this.heap[a.heapIndex] = b;
    this.heap[b.heapIndex] = a;
    let aIdx = a.heapIndex;
    a.heapIndex = b.heapIndex;
    b.heapIndex = aIdx;
  }

  remove() {
    let itemToremove = this.heap[0];
    this.count--;
    if (this.count > 0) {
      this.heap[0] = this.heap[this.count];
      this.heap[0].heapIndex = 0;
      this.sinkDown(this.heap[0]);
    }
    return itemToremove;
  }

  sinkDown(item) {
    while (true) {
      let leftIdx = item.heapIndex * 2 + 1;
      let rightIdx = item.heapIndex * 2 + 2;
      let swapIdx = 0;
      if (leftIdx < this.count) {
        swapIdx = leftIdx;
        if (rightIdx < this.count) {
          if (this.heap[leftIdx].compareTo(this.heap[rightIdx]) < 0) {
            swapIdx = rightIdx;
          }
        }
        if (item.compareTo(this.heap[swapIdx]) < 0) {
          this.swap(item, this.heap[swapIdx]);
        } else return;
      } else return;
    }
  }

  includes(item) {
    return this.heap[item.heapIndex] === item;
  }
}
