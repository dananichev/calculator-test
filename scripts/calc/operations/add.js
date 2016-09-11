"use strict";

function add(x) {
  this.reset();
  return function(y) {
    return x + y;
  }
}

calculator.registerOperation('add', add);
