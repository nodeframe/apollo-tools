'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlResolver = require('./graphql-resolver');

Object.keys(_graphqlResolver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _graphqlResolver[key];
    }
  });
});
//# sourceMappingURL=index.js.map