export function isHTMLValid(htmlString: string): boolean {
  const element = document.createElement('p');
  element.innerHTML = htmlString;
  const childNodes = element.childNodes;

  for (let i = 0; i < childNodes.length; i++)
    if (childNodes[i].nodeType != 1) return false;

  return true;
}
