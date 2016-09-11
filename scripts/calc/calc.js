(function(context) {
  var operations = {};
  var digits = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  
  function Calc(element) {
    var self = this;
    self.curOperation = null;
    self.wrapper = element;
    self.state = {
      input: null,
      value: 0,
      result: 0,
    };
    
    function initDom() {
      self.state.input = self.wrapper.find('.calculator-workarea');
      self.state.input.value = self.state.value;
    }
    
    function registerListeners() {
      self.wrapper.on('click', function(e) {
        if (e.target.hasClass('calculator-handle')) {
          var target = e.target;
          var operationId = target.getAttribute('data-operation');
          if (operationId) {
            var result = operations[operationId].call(self, self.state.value);
            if (typeof result !== 'function') {
              reset();
              updateValue(result);
            } else {
              self.curOperation = result;
            }
          } else {
            updateValue(parseInt(target.innerText, 10));
          }
          
          self.state.input.focus();
        }
        
        e.preventDefault();
      });
      
      self.state.input.on('keyup', function(e) {
        var key = e.key;
        
        if (key in digits) {
          updateValue(parseInt(key, 10));
        }
      });
    }
  
    function reset() {
      self.state = Object.assign({}, self.state, { value: 0 });
    }
  
    function updateValue(value) {
      var prevValue = self.state.value;
      var newValue;
      if (self.state.value === 0) {
        newValue = value;
      } else {
        newValue = "" + prevValue + value, 10;
      }
      self.state = Object.assign({}, self.state, { value: newValue });
    }
    
    function updateDom(prevValue) {
      self.state.input.value = self.state.value;
    }
    
    function tick() {
      requestAnimationFrame(function() {
        updateDom(self.state.value);
        tick();
      });
    }
  
    initDom();
    registerListeners();
    tick();
    
    self.reset = reset;
  }
  
  function registerOperation(id, operation) {
    operations[id] = operation;
  }
  
  function initCalc(element) {
    return new Calc(element);
  }
  
  context.calculator = {
    init: initCalc,
    registerOperation: registerOperation,
  };
})(window);
