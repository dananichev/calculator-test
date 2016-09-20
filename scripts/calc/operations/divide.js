"use strict";

(function(context) {
  /**
   * @this Calc
   * @param {number} x
   * @return {Function}
   */
  function divide(x) {
    this.needsUpdate = true;
    return function(y) {
      return x/y;
    }
  }
  
  context.calculator.registerOperation('divide', divide);
  context.calculator.registerOperation('/', divide);
})(window);
