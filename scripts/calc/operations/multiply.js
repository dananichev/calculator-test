"use strict";

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

calculator.registerOperation('multiply', multiply);
calculator.registerOperation('*', multiply);
