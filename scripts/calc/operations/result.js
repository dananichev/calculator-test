"use strict";

function result() {
  var calcResult = this.state.value;
  if (this.curOperation) {
    calcResult = this.curOperation(calcResult);
    this.curOperation = null;
  }
  
  return calcResult;
}

calculator.registerOperation('result', result);
