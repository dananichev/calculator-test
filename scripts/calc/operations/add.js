"use strict";

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

calculator.registerOperation('add', add);
calculator.registerOperation('+', add);
