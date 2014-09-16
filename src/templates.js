module.exports = {
  /**
   * Message template function.
   * @param  {object} jsonMessage - json data for the messgaes.
   * @return {string} - The generated HTML.
   */
  message: function(jsonMessage){
    return  "<div class='message' data-gordon-message='"+jsonMessage._id+"'><button data-close>&nbsp;</button><p>Message "+jsonMessage._id+"</p></div>";
  },

  /**
   * Container for the messages.
   * @return {string} - The generated html.
   */
  container: function(){
    return "<div data-gordon-messages><div>"
  }
};