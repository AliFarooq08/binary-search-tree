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
    buildTree(array = this.array) {
        let tempArray = [...array]
        const middle = tempArray[Math.floor(tempArray.length / 2)]
        tempArray.splice(Math.floor(array.length / 2), 1)
        this.root = new Tree.Node(middle)
        tempArray.forEach(num => {
            let currentTree = this.root
            let complete = false
            while (complete === false) {
                if (num < currentTree.value && currentTree.left !== null) {
                    currentTree = currentTree.left
                } else if (num < currentTree.value && currentTree.left === null) {
                    currentTree.left = new Tree.Node(num)
                    currentTree = currentTree.left
                    complete = true
                } else if (num >= currentTree.value && currentTree.right !== null) {
                    currentTree = currentTree.right
                } else if (num >= currentTree.value && currentTree.right === null) {
                    currentTree.right = new Tree.Node(num)
                    currentTree = currentTree.right
                    complete = true
                }
            }
        });
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
}
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
tree.buildTree()
tree.print()
console.log(`Contains 5?: ${tree.includes(5)}`)
console.log(`Contains 6700?: ${tree.includes(6700)}`)
tree.insert(6700)
tree.print()
console.log(`NEW CHECK - Contains 6700?: ${tree.includes(6700)}`)

