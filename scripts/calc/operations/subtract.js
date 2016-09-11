"use strict";

function subtract(x) {
  this.reset();
  return function(y) {
    return x - y;
  }
}

calculator.registerOperation('subtract', subtract);
