"use strict";

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

calculator.registerOperation('divide', divide);
calculator.registerOperation('/', divide);
