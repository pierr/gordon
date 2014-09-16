function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}


function removeElement(node) {
  node.parentNode.removeChild(node);
}

/**
 * Get closest DOM element up the tree that contains a class, ID, or data attribute
 * @param  {Element} elem The base element
 * @param  {String} selector The class or data attribute to look for
 * @return {Boolean|Element} False if no match
 */
/**
 * Get closest DOM element up the tree that contains a class or data attribute
 * @param  {Element} elem The base element
 * @param  {String} selector The class or data attribute to look for
 * @return {Boolean|Element} False if no match
 */
var getClosest = function(elem, selector) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if ((elem.classList !== undefined && elem.classList.contains(selector)) || elem.hasAttribute(selector)) {
      return elem;
    }
  }
  return false;
};


module.exports = {
  guid: function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },
  removeElement: removeElement,
  getClosest: getClosest
};