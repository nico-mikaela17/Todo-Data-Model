export function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}