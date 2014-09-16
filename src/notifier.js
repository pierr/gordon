var Notifier;

var util = require('./util');
Notifier = (function(config) {
  
  function Notifier(options) {
    this.selector = options.selector || "div[data-notifier]";
    this.messageTemplate = options.messageTemplate || require('./templates').message;
    this.messages = {};
  }
  
  Notifier.prototype.add = function(jsonMessage) {
    //Add a technical identifier.
    messages._id = util.guid();

  };

  return Notifier;

})();

module.exports = Notifier;