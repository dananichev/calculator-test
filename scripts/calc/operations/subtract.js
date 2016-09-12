"use strict";

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

calculator.registerOperation('subtract', subtract);
calculator.registerOperation('-', subtract);
