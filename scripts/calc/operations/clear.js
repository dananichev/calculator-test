"use strict";

(function(context) {
  function clear() {
    return 0;
  }
  
  context.calculator.registerOperation('clear', clear);
  context.calculator.registerOperation('Backspace', clear);
})(window);
