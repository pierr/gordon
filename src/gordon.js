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
    //this.el.querySelector(this.selector).
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