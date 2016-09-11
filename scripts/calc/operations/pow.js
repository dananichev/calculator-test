"use strict";

function pow(x) {
  this.reset();
  return function(y) {
    return Math.pow(x, y);
  }
}

function pow2(x) {
  var exp = pow.call(this, x);
  return exp(2);
}

calculator.registerOperation('pow', pow);
calculator.registerOperation('pow(2)', pow2);
