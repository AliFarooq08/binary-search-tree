class Tree {
  constructor(array) {
    this.array = array;
    this.root = undefined;
  }
  static Node = class {
    constructor(num, left = null, right = null) {
      this.value = num;
      this.left = left;
      this.right = right;
    }
  };
  buildTree(inputArray) {
    const array = inputArray || this.array;
    if (!array || array.length === 0) {
      this.root = null;
      return null;
    }
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
    const sortedArrayToBST = (arr, start, end) => {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);
      const node = new Tree.Node(arr[mid]);
      node.left = sortedArrayToBST(arr, start, mid - 1);
      node.right = sortedArrayToBST(arr, mid + 1, end);
      return node;
    };
    this.root = sortedArrayToBST(
      uniqueSortedArray,
      0,
      uniqueSortedArray.length - 1,
    );
    return this.root;
  }

  print(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }
    this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
  includes(value) {
    let currentTree = this.root;
    while (currentTree !== null) {
      if (currentTree.value === value) {
        return true;
      } else if (value < currentTree.value) {
        currentTree = currentTree.left;
      } else if (value > currentTree.value) {
        currentTree = currentTree.right;
      }
    }
    return false;
  }
  insert(value) {
    let currentTree = this.root;
    let complete = false;
    while (complete === false) {
      if (value < currentTree.value && currentTree.left !== null) {
        currentTree = currentTree.left;
      } else if (value < currentTree.value && currentTree.left === null) {
        currentTree.left = new Tree.Node(value);
        currentTree = currentTree.left;
        complete = true;
      } else if (value >= currentTree.value && currentTree.right !== null) {
        currentTree = currentTree.right;
      } else if (value >= currentTree.value && currentTree.right === null) {
        currentTree.right = new Tree.Node(value);
        currentTree = currentTree.right;
        complete = true;
      }
    }
  }
  delete(value) {
    let parent = this.root;
    let currentTree = this.root;
    while (currentTree !== null) {
      console.log(`Want ${value} searching ${currentTree.value}`);
      if (
        currentTree.value === value &&
        currentTree.left !== null &&
        currentTree.right !== null
      ) {
        console.log("Found with left and right values");
        let successor = currentTree.right;
        let parentToSuccessor = currentTree.right;
        let i = 0;
        while (successor.left !== null && successor !== null) {
          successor = successor.left;
          if (i > 0) {
            parentToSuccessor = parentToSuccessor.left;
          }
          i++;
        }
        currentTree.value = successor.value;
        if (successor === currentTree.right) {
          currentTree.right = successor.right;
        } else {
          parentToSuccessor.left = successor.right;
        }
        break;
      } else if (currentTree.value === value && currentTree.left !== null) {
        console.log("Found with only left children");
        if (currentTree === this.root) {
          this.root = currentTree.left;
        } else {
          currentTree.value = currentTree.left.value;
          currentTree.right = currentTree.left.right;
          currentTree.left = currentTree.left.left;
        }
        break;
      } else if (currentTree.value === value && currentTree.right !== null) {
        console.log("Found with only right children");
        if (currentTree === this.root) {
          this.root = currentTree.right;
        } else {
          currentTree.value = currentTree.right.value;
          currentTree.left = currentTree.right.left;
          currentTree.right = currentTree.right.right;
        }
        break;
      } else if (
        currentTree.right === null &&
        currentTree.left === null &&
        currentTree.value === value
      ) {
        if (parent.right === currentTree) {
          parent.right = null;
        } else if (parent.left === currentTree) {
          parent.left = null;
        }
        break;
      } else if (value < currentTree.value) {
        parent = currentTree;
        currentTree = currentTree.left;
      } else if (value > currentTree.value) {
        parent = currentTree;
        currentTree = currentTree.right;
      }
    }
  }
  levelOrderForEach(callback, branch = this.root, queue = []) {
    if (typeof callback === "function" && branch !== null) {
      let removed = undefined;
      if (branch === this.root) {
        queue.push(branch);
        removed = queue.shift();
        callback(removed.value);
      }
      if (branch.left !== null) {
        queue.push(branch.left);
      }
      if (branch.right !== null) {
        queue.push(branch.right);
      }
      removed = queue.shift();
      if (removed !== undefined) {
        callback(removed.value);
        this.levelOrderForEach(callback, removed, queue);
      }
    } else if (typeof callback !== "function") {
      throw new TypeError("Parameter entered must be function (callback)");
    }
  }
  inOrderForEach(callback, branch = this.root) {
    if (typeof callback === "function") {
      if (this.root.left !== null || this.root.right !== null) {
        if (branch !== null) {
          this.inOrderForEach(callback, branch.left);
          callback(branch.value);
          this.inOrderForEach(callback, branch.right);
        }
      }
    } else {
      throw new TypeError("Parameter entered must be function (callback)");
    }
  }
  preOrderForEach(callback, branch = this.root) {
    if (typeof callback === "function") {
      if (this.root.left !== null || this.root.right !== null) {
        if (branch !== null) {
          callback(branch.value);
          this.preOrderForEach(callback, branch.left);
          this.preOrderForEach(callback, branch.right);
        }
      }
    } else {
      throw new TypeError("Parameter entered must be function (callback)");
    }
  }
  postOrderForEach(callback, branch = this.root) {
    if (typeof callback === "function") {
      if (this.root.left !== null || this.root.right !== null) {
        if (branch !== null) {
          this.postOrderForEach(callback, branch.left);
          this.postOrderForEach(callback, branch.right);
          callback(branch.value);
        }
      }
    } else {
      throw new TypeError("Parameter entered must be function (callback)");
    }
  }
  height(value, branch = this.root, mode = "search") {
    if (mode === "search") {
      let currentTree = branch;
      let start = null;
      while (currentTree !== null) {
        if (currentTree.value === value) {
          start = currentTree;
          break;
        } else if (value < currentTree.value) {
          currentTree = currentTree.left;
        } else if (value > currentTree.value) {
          currentTree = currentTree.right;
        }
      }
      if (start !== null) {
        return this.height(value, start, "count");
      } else {
        return undefined;
      }
    } else if (mode === "count") {
      if (branch === null) {
        return -1;
      } else {
        let left = this.height(value, branch.left, "count");
        let right = this.height(value, branch.right, "count");
        if (left > right) {
          return left + 1;
        } else {
          return right + 1;
        }
      }
    }
  }
  depth(value) {
    let currentTree = this.root;
    let count = 0;
    while (currentTree !== null) {
      if (currentTree.value === value) {
        return count;
      } else if (value < currentTree.value) {
        count++;
        currentTree = currentTree.left;
      } else if (value > currentTree.value) {
        count++;
        currentTree = currentTree.right;
      }
    }
    return undefined;
  }
  isBalanced(branch = this.root) {
    if (branch === null) {
      return true;
    }
    let leftHeight = undefined;
    let rightHeight = undefined;
    if (branch.left !== null) {
      leftHeight = this.height(branch.left.value);
    } else {
      leftHeight = -1;
    }
    if (branch.right !== null) {
      rightHeight = this.height(branch.right.value);
    } else {
      rightHeight = -1;
    }
    if (Math.abs(leftHeight - rightHeight) <= 1) {
      let leftBalance = this.isBalanced(branch.left);
      let rightBalance = this.isBalanced(branch.right);
      return leftBalance && rightBalance;
    } else {
      return false;
    }
  }
  rebalance() {
    let values = [];
    function valueAdd(item) {
      values.push(item);
    }
    this.inOrderForEach(valueAdd);
    this.array = values;
    this.buildTree();
    console.log("New Tree:");
    this.print();
    console.log("Checking if balanced:");
    console.log(this.isBalanced());
  }
}
export { Tree };
