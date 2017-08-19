'use strict';

module.exports = {
  getObject: function(obj) {
    if ((typeof obj) === 'string') {
      obj = JSON.parse(obj);
    }
    return obj;
  }
}