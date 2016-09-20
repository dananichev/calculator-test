"use strict";

(function(context) {
  /**
   * @this Calc
   * @return {number}
   */
  function equals() {
    return parseFloat(this.state.value);
  }
  
  context.calculator.registerOperation('result', equals);
  context.calculator.registerOperation('=', equals);
  context.calculator.registerOperation('Enter', equals);
})(window);
