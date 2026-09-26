class Tree {
    constructor(array) {
        this.array = array
        this.root = undefined
    }
    static Node = class {
        constructor(num, left = null, right = null) {
            this.value = num
            this.left = left
            this.right = right
        }
    }
    buildTree(inputArray) {
        const array = inputArray || this.array
        if (!array || array.length === 0) {
            this.root = null
            return null
        }
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
        const sortedArrayToBST = (arr, start, end) => {
            if (start > end) {
                return null
            }
            const mid = Math.floor((start + end) / 2)
            const node = new Tree.Node(arr[mid])
            node.left = sortedArrayToBST(arr, start, mid - 1)
            node.right = sortedArrayToBST(arr, mid + 1, end)
            return node
        }
        this.root = sortedArrayToBST(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
        return this.root
    }

    print(node = this.root, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }
        this.print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        this.print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
    includes(value) {
        let currentTree = this.root
        while (currentTree !== null) {
            if (currentTree.value === value) {
                return true
            } else if (value < currentTree.value) {
                currentTree = currentTree.left
            } else if (value > currentTree.value ) {
                currentTree = currentTree.right
            } 
        }
        return false
    }
    insert(value) {
        let currentTree = this.root
        let complete = false
        while (complete === false) {
            if (value < currentTree.value && currentTree.left !== null) {
                currentTree = currentTree.left
            } else if (value < currentTree.value && currentTree.left === null) {
                currentTree.left = new Tree.Node(value)
                currentTree = currentTree.left
                complete = true
            } else if (value >= currentTree.value && currentTree.right !== null) {
                currentTree = currentTree.right
            } else if (value >= currentTree.value && currentTree.right === null) {
                currentTree.right = new Tree.Node(value)
                currentTree = currentTree.right
                complete = true
            }
        }
    }
    delete(value) {
        let parent = this.root
        let currentTree = this.root
        while (currentTree !== null) {
            console.log(`Want ${value} searching ${currentTree.value}`)
            if (currentTree.value === value && currentTree.left !== null && currentTree.right !== null) {
                console.log('Found with left and right values')
                let successor = currentTree.right
                let parentToSuccessor = currentTree.right
                let i = 0
                while (successor.left !== null && successor !== null) {
                    successor = successor.left
                    if (i > 0) {
                        parentToSuccessor = parentToSuccessor.left
                    }
                    i++
                }
                currentTree.value = successor.value
                if (successor === currentTree.right) {
                    currentTree.right = successor.right
                } else {
                    parentToSuccessor.left = successor.right
                }
                break
            } else if (currentTree.value === value && currentTree.left !== null) {
                console.log("Found with only left children")
                if (currentTree === this.root) {
                    this.root = currentTree.left
                } else {
                    currentTree.value = currentTree.left.value
                    currentTree.right = currentTree.left.right
                    currentTree.left = currentTree.left.left
                }
                break
            } else if (currentTree.value === value && currentTree.right !== null) {
                console.log("Found with only right children")
                if (currentTree === this.root) {
                    this.root = currentTree.right
                } else {
                    currentTree.value = currentTree.right.value
                    currentTree.left = currentTree.right.left
                    currentTree.right = currentTree.right.right
                }
                break
            } else if (currentTree.right === null && currentTree.left === null && currentTree.value === value) {
                if (parent.right === currentTree) {
                    parent.right = null
                } else if (parent.left === currentTree) {
                    parent.left = null
                }
                break
            } else if (value < currentTree.value) {
                parent = currentTree
                currentTree = currentTree.left
            } else if (value > currentTree.value ) {
                parent = currentTree
                currentTree = currentTree.right
            } 
        }
    }
    levelOrderForEach(callback, branch = this.root, queue = []) {
        if (typeof callback === "function" && branch !== null) {
            let removed = undefined
            if (branch === this.root) {
                queue.push(branch)
                removed = queue.shift()
                callback(removed.value)
            }
            if (branch.left !== null) {
                queue.push(branch.left)
            }
            if (branch.right !== null) {
                queue.push(branch.right)
            }
            removed = queue.shift()
            if (removed !== undefined) {
                callback(removed.value)
                this.levelOrderForEach(callback, removed, queue)
            }
        } else if (typeof callback !== "function") {
            throw new TypeError("Parameter entered must be function (callback)")
        }
    }
    inOrderForEach(callback, branch = this.root) {
        if (typeof callback === "function") {
            if (this.root.left !== null || this.root.right !== null) {
                if (branch !== null) {
                    this.inOrderForEach(callback, branch.left)
                    callback(branch.value)
                    this.inOrderForEach(callback, branch.right)
                }
            }
        } else {
            throw new TypeError("Parameter entered must be function (callback)")
        }
    }
    preOrderForEach(callback, branch = this.root) {
        if (typeof callback === "function") {
            if (this.root.left !== null || this.root.right !== null) {
                if (branch !== null) {
                    callback(branch.value)
                    this.preOrderForEach(callback, branch.left)
                    this.preOrderForEach(callback, branch.right)
                }
            }
        } else {
            throw new TypeError("Parameter entered must be function (callback)")
        }
    }    
    postOrderForEach(callback, branch = this.root) {
        if (typeof callback === "function") {
            if (this.root.left !== null || this.root.right !== null) {
                if (branch !== null) {
                        this.postOrderForEach(callback, branch.left, )
                        this.postOrderForEach(callback, branch.right)
                        callback(branch.value)
                } 
            }
        } else {
            throw new TypeError("Parameter entered must be function (callback)")
        }
    }
    height(value, branch = this.root, mode = "search") {
        if (mode === "search") {
            let currentTree = branch
            let start = null
            while (currentTree !== null) {
                if (currentTree.value === value) {
                    start = currentTree
                    break
                } else if (value < currentTree.value) {
                    currentTree = currentTree.left
                } else if (value > currentTree.value ) {
                    currentTree = currentTree.right
                }
            }
            if (start !== null) {
                return this.height(value, start, "count")
            } else {
                return undefined
            }
        } else if (mode === "count") {
            if (branch === null) {
                return -1
            } else {
                let left = this.height(value, branch.left, "count")
                let right = this.height (value, branch.right, "count")
                if (left > right) {
                    return left + 1
                } else {
                    return right + 1
                }
            }
        }
    }
    depth(value) {
        let currentTree = this.root
        let count = 0
        while (currentTree !== null) {
            if (currentTree.value === value) {
                return count
            } else if (value < currentTree.value) {
                count++
                currentTree = currentTree.left
            } else if (value > currentTree.value ) {
                count++
                currentTree = currentTree.right
            }
        }
        return undefined
    }
    isBalanced(branch = this.root) {
        if (branch === null) {
            return true
        }
        let leftHeight = undefined
        let rightHeight = undefined
        if (branch.left !== null) {
            leftHeight = this.height(branch.left.value)
        } else {
            leftHeight = -1
        }
        if (branch.right !== null) {
            rightHeight = this.height(branch.right.value)
        } else {
            rightHeight = -1
        }
        if (Math.abs(leftHeight - rightHeight) <= 1) {
            let leftBalance = this.isBalanced(branch.left)
            let rightBalance = this.isBalanced(branch.right)
            return leftBalance && rightBalance
        } else {
            return false
        }
    }
    rebalance() {
        let values = []
        function valueAdd(item) {
            values.push(item)
        }
        this.inOrderForEach(valueAdd)
        this.array = values
        this.buildTree()
        console.log("New Tree:")
        this.print()
        console.log("Checking if balanced:")
        console.log(this.isBalanced())
    }
}
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree.buildTree()
tree.print()
console.log(`Contains 5?: ${tree.includes(5)}`)
console.log(`Contains 6700?: ${tree.includes(6700)}`)
tree.insert(6700)
tree.print()
console.log(`NEW CHECK - Contains 6700?: ${tree.includes(6700)}`)
console.log("Remove 23")
tree.delete(23)
tree.print()
console.log("Remove 3")
tree.delete(3)
tree.print()
console.log("Remove 1")
tree.delete(1)
tree.print()
console.log("Remove 8")
tree.delete(8)
tree.print()
console.log("Remove 67")
tree.delete(67)
tree.print()
console.log("Remove 4")
tree.delete(4)
tree.print()
console.log("Remove 4")
tree.delete(4)
tree.print()
function print(num) {
    console.log(num)
}
const tree2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree2.buildTree()
console.log("Level order for each")
tree2.print()
tree2.levelOrderForEach(print)
console.log("Tree 1")
tree.levelOrderForEach(print)

const tree3 = new Tree([1, 7, 4, 23, 8, 9, 4, 10, 5, 7, 9, 67, 6345, 324])
tree3.buildTree()
console.log("Now in order for each")
tree3.buildTree()
tree3.print()
tree3.inOrderForEach(print)
console.log("tree2")
tree2.print()
tree2.inOrderForEach(print)
console.log("tree1")
tree.print()
tree.inOrderForEach(print)
console.log("Now pre order for each")
tree3.print()
tree3.preOrderForEach(print)
console.log("tree2")
tree2.print()
tree2.preOrderForEach(print)
console.log("tree1")
tree.print()
tree.preOrderForEach(print)
console.log("Now post order for each")
tree3.print()
tree3.postOrderForEach(print)
console.log("tree2")
tree2.print()
tree2.postOrderForEach(print)
console.log("tree1")
tree.print()
tree.postOrderForEach(print)
console.log("Heights:")
console.log(tree.height(324))
console.log(tree.height(7))
console.log(tree2.height(3))
console.log(tree.height(79))
console.log("Depths:")
console.log(tree.depth(324))
console.log(tree.depth(6700))
console.log(tree2.depth(3))
console.log(tree.depth(79))
console.log("Check balance")
tree.print()
console.log(tree.isBalanced())
tree2.print()
console.log(tree2.isBalanced())
tree3.print()
console.log(tree3.isBalanced())
const balancedTree = new Tree([1, 2, 3])
balancedTree.buildTree()
balancedTree.print()
console.log(balancedTree.isBalanced())
tree.rebalance()
tree2.rebalance()
tree3.rebalance()
