Gordon
========

A simple notification component written in vanilla js. It has no dependencies.

It is really simple to use:

## HTML
In the main html page:
- Require the script by any mean (Example: `<script  type="text/javascript" src="gordon.js"></script>`)
- Declare an html container in your html page.
```html
<div class='gordonExamplContainer'></div>
```

## JavaScript
Register the component in javascript.
```javascript
var gordon = new Gordon();
gordon.add({type: "warning", content: "warning hello"});
gordon.add({type: "error", content: "error hello"});
gordon.add({type: "info", content: "info hello"});
gordon.add({type: "success", content: "success hello"});
document.querySelector('.gordonExamplContainer').appendChild(gordon.render().el);
```

## API
- add: Add a message in the gordon container. There are two types of messages: permanent and not permanent.