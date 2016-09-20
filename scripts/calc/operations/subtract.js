"use strict";

(function(context) {
  /**
   * @this Calc
   * @param {number} x
   * @return {Function}
   */
  function subtract(x) {
    this.needsUpdate = true;
    return function(y) {
      return x - y;
    }
  }
  
  context.calculator.registerOperation('subtract', subtract);
  context.calculator.registerOperation('-', subtract);
})(window);
