"use strict";

(function(context) {
  /**
   * @this Calc
   * @param {number} x
   * @return {Function}
   */
  function add(x) {
    this.needsUpdate = true;
    return function(y) {
      return x + y;
    }
  }
  
  context.calculator.registerOperation('add', add);
  context.calculator.registerOperation('+', add);
})(window);
