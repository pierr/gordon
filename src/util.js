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
var getClosest = function (elem, selector) {

    var firstChar = selector.charAt(0);

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( firstChar === '.' ) {
            if ( elem.classList.contains( selector.substr(1) ) ) {
                return elem;
            }
        } else if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        } else if ( firstChar === '[' ) {
            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) {
                return elem;
            }
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
  getClosest:getClosest
};