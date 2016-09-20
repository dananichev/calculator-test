"use strict";

(function(context) {
  /**
   * @this Calc
   * @param {number} x
   * @return {Function}
   */
  function multiply(x) {
    this.needsUpdate = true;
    return function(y) {
      return x * y;
    }
  }
  
  context.calculator.registerOperation('multiply', multiply);
  context.calculator.registerOperation('*', multiply);
})(window);
