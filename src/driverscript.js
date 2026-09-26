import { Tree } from "./index.js";
function createArray(repeats) {
  let array = [];
  for (let i = 0; i < repeats; i++) {
    array.push(Math.floor(Math.random() * 99) + 1);
  }
  return array;
}
let myArray = createArray(100);
const tree = new Tree(myArray);
tree.buildTree();
console.log(`Tree is balanced?: ${tree.isBalanced()}`);
console.log("");

function print(num) {
  console.log(num);
}
tree.print();
console.log("");
console.log("Level order for each:");
tree.levelOrderForEach(print);
console.log("");
console.log("Pre order for each:");
tree.preOrderForEach(print);
console.log("");
console.log("Post order for each:");
tree.postOrderForEach(print);
console.log("");
console.log("In order for each:");
tree.inOrderForEach(print);
console.log("");
console.log("Inserting Values...");
tree.insert(435);
tree.insert(101);
tree.insert(670);
tree.insert(133);
tree.insert(342);
tree.insert(356);
console.log("");
console.log(`Tree is balanced?: ${tree.isBalanced()}`);
console.log("");
console.log("Rebalancing Tree");
tree.rebalance();
console.log("");
console.log(`Tree is balanced?: ${tree.isBalanced()}`);
console.log("");
console.log("Level order for each:");
tree.levelOrderForEach(print);
console.log("");
console.log("Pre order for each:");
tree.preOrderForEach(print);
console.log("");
console.log("Post order for each:");
tree.postOrderForEach(print);
console.log("");
console.log("In order for each:");
tree.inOrderForEach(print);
