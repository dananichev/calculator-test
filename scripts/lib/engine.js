// basic helpers for dom traversal/manipulation
"use strict";

function $(selector, context) {
  if (!context) {
    context = document;
  }
  
  var query = context.querySelectorAll(selector);
  var result = query;
  if (query.length === 1) {
    result = query[0];
  }

  if (result.length === 0) {
    result = null;
  }

  return result;
}

if (!('find' in HTMLElement.prototype)) {
  HTMLElement.prototype.find = function find(selector) {
    return $(selector, this);
  };
}

if (!('toggle' in HTMLElement.prototype)) {
  HTMLElement.prototype.toggle = function toggle() {
    if (this.style.display !== 'none') {
      this.style.display = 'none';
    } else {
      this.style.display = 'block';
    }
  };
}

if (!('remove' in HTMLElement.prototype)) {
  HTMLElement.prototype.remove = function remove() {
    var parent = this.parentNode;
    parent.removeChild(this);
  };
}

if (!('replace' in HTMLElement.prototype)) {
  HTMLElement.prototype.replace = function replace(element) {
    var parent = this.parentNode;

    if (parent) {
      parent.replaceChild(element, this);
    }
  };
}

if (!('each' in HTMLElement.prototype)) {
  HTMLElement.prototype.each = function each(callback) {
    callback(this, 0);
  };
}

if (!('on' in HTMLElement.prototype)) {
  HTMLElement.prototype.on = function on(eventType, callback) {
    return this.addEventListener(eventType, callback);
  };
}

if (!('one' in HTMLElement.prototype)) {
  HTMLElement.prototype.one = function one(eventType, callback) {
    var self = this;
    var cb = function(e) {
      self.removeEventListener(eventType, cb);
      callback(e);
    };
    return self.addEventListener(eventType, cb);
  };
}

if (!('off' in HTMLElement.prototype)) {
  HTMLElement.prototype.off = function off(eventType, callback) {
    return this.removeEventListener(eventType, callback);
  };
}

if (!('trigger' in HTMLElement.prototype)) {
  HTMLElement.prototype.trigger = function trigger(eventType, data) {
    var event;
    var eventData = data || null;

    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent(eventType, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = eventType;
    }

    event.eventName = eventType;
    event.data = eventData;

    if (document.createEvent) {
      this.dispatchEvent(event);
    } else {
      this.fireEvent('on'+event.eventType, event);
    }
  };
}

if (!('hasClass' in HTMLElement.prototype)) {
  HTMLElement.prototype.hasClass = function hasClass(name) {
    var self = this;
    var result = false;
    var needle = name.split(',');
    needle.forEach(function (item) {
      if (self.classList.contains(item)) {
        result = true;
      }
    });
    return result;
  };
}

if (!('removeClass' in HTMLElement.prototype)) {
  HTMLElement.prototype.removeClass = function removeClass(name) {
    var self = this;
    var needle = name.split(',');
    needle.forEach(function (item) {
      self.classList.remove(item);
    });
    return self;
  };
}

if (!('addClass' in HTMLElement.prototype)) {
  HTMLElement.prototype.addClass = function addClass(name) {
    var self = this;
    var needle = name.split(',');
    needle.forEach(function (item) {
      self.classList.add(item);
    });
    return self;
  };
}

if (!('toggleClass' in HTMLElement.prototype)) {
  HTMLElement.prototype.toggleClass = function toggleClass(name) {
    var self = this;
    var needle = name.split(',');
    needle.forEach(function (item) {
      if (self.classList.contains(item)) {
        self.classList.remove(item);
      } else {
        self.classList.add(item);
      }
    });
    return self;
  };
}

if (!('find' in NodeList.prototype)) {
  NodeList.prototype.find = function find(selector) {
    var result = document.createDocumentFragment();

    for (var item in this) {
      if (this.hasOwnProperty(item)) {
        var el = $(selector, item);
        if (el) {
          if (el.length > 1) {
            for (var subItem in el) {
              if (el.hasOwnProperty(subItem)) {
                result.appendChild(subItem);
              }
            }
          } else {
            result.appendChild(el);
          }
        }
      }
    }

    return result.childNodes;
  };
}

if (!('each' in NodeList.prototype)) {
  NodeList.prototype.each = function each(callback) {
    var i = 0;
    [].forEach.call(this, function(item) {
      callback(item, i);
      i++;
    });
  };
}

if (!('trigger' in NodeList.prototype)) {
  NodeList.prototype.trigger = function trigger(eventType, data) {
    var eventData = data || null;
    this.each(function (item) {
      item.trigger(eventType, eventData);
    });
  };
}
