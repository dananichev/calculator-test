"use strict";

function multiply(x) {
  this.reset();
  return function(y) {
    return x * y;
  }
}

calculator.registerOperation('multiply', multiply);
