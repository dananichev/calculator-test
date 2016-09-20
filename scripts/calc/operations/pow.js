"use strict";

(function(context) {
  /**
   * @this Calc
   * @param {number} x
   * @return {Function}
   */
  function pow(x) {
    this.needsUpdate = true;
    return function(y) {
      return Math.pow(x, y);
    }
  }
  
  /**
   * @this Calc
   * @param {number} x
   * @return {number}
   */
  function pow2(x) {
    var exp = pow.call(this, x);
    return exp(2);
  }
  
  context.calculator.registerOperation('^2', pow2);
  context.calculator.registerOperation('^', pow);
})(window);
