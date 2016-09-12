"use strict";

/**
 * @this Calc
 * @return {number}
 */
function result() {
  var calcResult = parseFloat(this.state.value);
  if (this.operation) {
    calcResult = this.operation(calcResult);
    this.operation = null;
  }
  
  return calcResult;
}

calculator.registerOperation('result', result);
calculator.registerOperation('=', result);
calculator.registerOperation('Enter', result);
