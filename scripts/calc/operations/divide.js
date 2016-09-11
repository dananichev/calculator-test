"use strict";

function divide(x) {
  this.reset();
  return function(y) {
    return x/y;
  }
}

calculator.registerOperation('divide', divide);
