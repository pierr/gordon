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