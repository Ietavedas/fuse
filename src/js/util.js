function findElement(event, selector, parentElement) {
    // event.stopPropagation();
    const parent = event.target === parentElement 
        ? event.target 
        : event.target.closest(parent)
    const childs = parent.children;
    const arr = [...childs].filter(childElement => childElement.classList.contains(selector));

    return arr[0];
}

export { findElement };