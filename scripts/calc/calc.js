(function(context) {
  var operations = {};
  var allowedKeys = [
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
    '.',
  ];
  
  /**
   * Calc
   * @param {HTMLElement} element - calculator wrapper (should contain calculator-handles and calculator-workarea elements)
   * @constructor
   * @return {Calc}
   */
  function Calc(element) {
    var handlers = $('.calculator-handle');
    var self = this;
    self.handlers = {};
    self.operation = null;
    self.wrapper = element;
    self.state = {
      input: null,
      value: 0,
      result: 0,
    };
    /*
     internal flag, used for distinguish different kind of interaction;
     if self.operation !== null and self.value !== 0 and it's first user input
        then we need to update input's value (starting from 0)
     */
    self.needsUpdate = true;
    
    function initDom() {
      self.state.input = self.wrapper.find('.calculator-workarea');
      self.state.input.value = self.state.value;
    }
  
    /**
     * handler for user input
     * @param {HTMLElement} target
     */
    function handleInput(target) {
      var operationId = target.getAttribute('data-operation');
      if (operationId) {
        handleOperation(operationId);
      } else {
        handleValue(target.innerText);
      }
    }
  
    /**
     * handles user operation
     * @param {string} operation - id of operation
     */
    function handleOperation(operation) {
      var result = operations[operation].call(self, parseFloat(self.state.value));
      if (typeof result !== 'function') {
        reset();
        updateValue(result);
      } else {
        self.operation = result;
      }
    }
  
    /**
     * handles value change
     * @param {number|string} value
     */
    function handleValue(value) {
      if (self.needsUpdate) {
        reset();
        self.needsUpdate = false;
      }
      
      updateValue(value);
    }
  
    /**
     * map handlers to dom elements
     */
    function mapHandlers() {
      handlers.each(function(handler) {
        var operation = handler.getAttribute('data-operation');
        if (Boolean(operation)) {
          self.handlers[operation] = handler;
        } else {
          self.handlers[handler.innerText] = handler;
        }
      });
    }
  
    /**
     * register listeners for mouse and keyboard events
     */
    function registerListeners() {
      self.wrapper.on('click', function(e) {
        if (e.target.hasClass('calculator-handle')) {
          handleInput(e.target);
          self.state.input.focus();
        }
        
        e.preventDefault();
      });
      
      self.state.input.on('keyup', function(e) {
        var key = e.key; // wont work in current version of Safari
  
        if (self.handlers[key]) {
          if (key in operations) {
            handleOperation(key);
          }
  
          // to restart the animation it's needed to remove class and start timeout
          self.handlers[key].removeClass('active');
          setTimeout(function() {
            self.handlers[key].addClass('active');
          }, 10);
        }
  
        if (key === '.') {
          handleValue(key);
        } else if (allowedKeys.indexOf(parseInt(key, 10)) >= 0) {
          handleValue(key);
        }
      });
    }
  
    /**
     * resets current value in state
     */
    function reset() {
      self.state = Object.assign({}, self.state, { value: 0 });
    }
  
    /**
     * updates value in state
     * @param {number|string} value
     */
    function updateValue(value) {
      var prevValue = self.state.value;
      var newValue;
      if (self.state.value === 0) {
        newValue = value;
      } else {
        if (value === '.') {
          newValue = parseFloat('' + prevValue + value) + '.';
        } else {
          newValue = parseFloat('' + prevValue + value);
        }
      }
      self.state = Object.assign({}, self.state, { value: newValue });
    }
  
    /**
     * syncs input's value with state value
     */
    function updateDom() {
      self.state.input.value = self.state.value;
    }
  
    function tick() {
      requestAnimationFrame(function() {
        updateDom();
        tick();
      });
    }
  
    initDom();
    mapHandlers();
    registerListeners();
    tick();
    
    self.reset = reset;
  }
  
  /**
   * adds operation to operations list (f.e. add, multiply, divide)
   * @param {string} id
   * @param {string} slug
   * @param {Function} operation
   */
  function registerOperation(id, operation) {
    operations[id] = operation;
  }
  
  /**
   * init method for calculator
   * @param {HTMLElement} element
   * @return {Calc}
   */
  function initCalc(element) {
    return new Calc(element);
  }
  
  context.calculator = {
    init: initCalc,
    registerOperation: registerOperation,
  };
})(window);
