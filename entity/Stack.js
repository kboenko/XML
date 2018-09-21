class Stack {

  constructor() {
    this.storage = [];
  }

  size() {
    return this.storage.length;
  }

  push(item) {
    this.storage.push(item);
  }

  pop() {
    this.storage.pop();
  }

  peek() {
    return this.storage[this.storage.length - 1];
  }

}

module.exports = Stack;