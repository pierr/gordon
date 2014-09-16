(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Register as jQuery Component.
window.Gordon = require('./gordon');
//Publish as a CommonJs module
},{"./gordon":3}],2:[function(require,module,exports){
var util = require('./util');
var events = {
  /**
   * Close button handler.
   * @param  {[type]} e - Jquery event.
   * @return {[type]}   [description]
   */
  closeButton: function closeButtonEventHandler(e){
    console.log("close button context",this);
    e.preventDefault();
    var eventEmitter = this.parentElement.parentElement.parentElement;// util.getClosest(this,'[data-gordon]');
    eventEmitter.dispatchEvent(new CustomEvent("message:close", {detail: this.parentElement.getAttribute('data-gordon-message')}));
  }
};

module.exports = events;
},{"./util":5}],3:[function(require,module,exports){
//dependencies
var templates = require('./templates');
var util = require('./util');
var events = require('./events');

/**
 * Gordon class.
 * @param  {object} config  - Configuration of the notifier element
 * @return {[type]}        [description]
 */
var Gordon = (function(config) {

  /**
   * Gordon constructor.
   * @param {object} options - Options available for the component.
   */
  function Gordon(options) {
    options = options || {};
    this.selector = options.selector || "div[data-gordon-messages]";
    this.containerTemplate = options.containerTemplate || templates.container;
    this.messageTemplate = options.messageTemplate || templates.message;
    this.closeButtonSelector = options.closeButtonSelector || "[data-close]";
    this.messages = {};
    this.tagName = options.tagName || "div";
    this.el = document.createElement(this.tagName);
    this.el.setAttribute('data-gordon', 'root');
  }

  /**
   * Add a notification into the pipe.
   * @param {[type]}  jsonMessage [description]
   * @param {Boolean} isPermanent [description]
   */
  Gordon.prototype.add = function(jsonMessage, isPermanent) {
    jsonMessage.isPermanent = isPermanent || false;
    //Add a technical identifier.
    jsonMessage._id = util.guid();
    this.messages[jsonMessage._id] = jsonMessage;
    //this.el.querySelector(this.selector). //ToDO: add a display on the go.
    return this;
  };


  /**
   * Register events on the
   * @return {[type]} [description]
   */
  Gordon.prototype.registerEvents = function() {
    var closeButtons = this.el.querySelectorAll(this.closeButtonSelector);
    var gordon = this;
    //Register all button clicks.
    Array.prototype.forEach.call(closeButtons, function(closeButton) {
      closeButton.addEventListener('click', events.closeButton, false);
    });
    //Register an event to update the data state.
    gordon.el.addEventListener('message:close', function(e) {
      gordon.deleteMessage(e.detail);
    }, false);
  }

  Gordon.prototype.deleteMessage =  function(msgInternalId){
    //Delete the data.
    delete this.messages[msgInternalId];
     //Delete the HTML.
    util.removeElement(this.el.querySelector('[data-gordon-message="'+msgInternalId+'"]'));
  }
  /**
   * Inject html from the data into the component.
   * @return {[type]} [description]
   */
  Gordon.prototype.render = function() {
    this.el.innerHTML = this.containerTemplate();
    var messagesContainer = this.el.querySelector(this.selector);
    var htmlMessages = "";
    for (var message in this.messages) {
      htmlMessages = htmlMessages + this.messageTemplate(this.messages[message]);
    }
    messagesContainer.innerHTML = htmlMessages;
    this.registerEvents();
    return this;
  }


  return Gordon;

})();

module.exports = Gordon;
},{"./events":2,"./templates":4,"./util":5}],4:[function(require,module,exports){
module.exports = {
  /**
   * Message template function.
   * @param  {object} jsonMessage - json data for the messgaes.
   * @return {string} - The generated HTML.
   */
  message: function(jsonMessage){
    console.log("message", jsonMessage);
    return  "<div class='message' data-"+jsonMessage.type+" data-gordon-message='"+jsonMessage._id+"'><button data-close>x</button><p>Message "+jsonMessage.content+"</p></div>";
  },

  /**
   * Container for the messages.
   * @return {string} - The generated html.
   */
  container: function(){
    return "<div data-gordon-messages><div>"
  }
};
},{}],5:[function(require,module,exports){
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
},{}]},{},[1]);
