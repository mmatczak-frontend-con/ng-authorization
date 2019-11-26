export interface TreeElement {
  children?: TreeElement[];
}

export function traverseTree<E extends TreeElement>(treeRoot: E, onTreeElementVisitFn: (element: E) => void) {
  const stack = [];
  let currentElement = treeRoot;

  while (currentElement) {
    onTreeElementVisitFn(currentElement);
    if (currentElement.children) {
      Array.prototype.push.apply(stack, currentElement.children); // push all children (as an array) on stack
    }
    currentElement = stack.pop();
  }
}
