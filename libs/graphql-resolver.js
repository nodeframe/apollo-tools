"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = exports.Subscription = exports.Query = exports.createResolvers = exports.mergeOperation = exports.GraphQLResolver = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("reflect-metadata");

var _enums = require("./enums");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphQLResolver = exports.GraphQLResolver = function () {
  function GraphQLResolver() {
    _classCallCheck(this, GraphQLResolver);

    Reflect.defineMetadata(_enums.ResolverType, true, this);
  }

  _createClass(GraphQLResolver, [{
    key: "Resolvers",
    get: function get() {
      var _this = this;

      return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(function (propertyName) {
        return propertyName !== "constructor" && Reflect.getMetadata(_enums.OperationType, _this, propertyName);
      }).reduce(function (schma, propertyName) {
        var type = Reflect.getMetadata(_enums.OperationType, _this, propertyName);
        return _extends({}, schma, _defineProperty({}, _enums.PropertyNameMap[type], _extends({}, schma[_enums.PropertyNameMap[type]], _defineProperty({}, propertyName, _this[propertyName].bind(_this)))));
      }, Object.create(null));
    }
  }]);

  return GraphQLResolver;
}();

var assertClass = function assertClass(Resolver, errorMessage) {
  if (typeof Resolver !== 'function') {
    throw new Error(errorMessage);
  }
};
var assertHasMetaData = function assertHasMetaData(key, obj, errorMessage) {
  if (!Reflect.getMetadata(_enums.ResolverType, obj)) throw new Error(errorMessage);
};

var mergeOperation = exports.mergeOperation = function mergeOperation(obj1, obj2) {
  var _mergedObj;

  var mergedObj = (_mergedObj = {}, _defineProperty(_mergedObj, _enums.PropertyNameMap[_enums.QueryOperation], _extends({}, obj1[_enums.PropertyNameMap[_enums.QueryOperation]] || {}, obj2[_enums.PropertyNameMap[_enums.QueryOperation]] || {})), _defineProperty(_mergedObj, _enums.PropertyNameMap[_enums.MutationOperation], _extends({}, obj1[_enums.PropertyNameMap[_enums.MutationOperation]] || {}, obj2[_enums.PropertyNameMap[_enums.MutationOperation]] || {})), _defineProperty(_mergedObj, _enums.PropertyNameMap[_enums.SubscriptionOperation], _extends({}, obj1[_enums.PropertyNameMap[_enums.SubscriptionOperation]] || {}, obj2[_enums.PropertyNameMap[_enums.SubscriptionOperation]] || {})), _mergedObj);
  return mergedObj;
};

var merge = function merge(obj) {
  for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objs[_key - 1] = arguments[_key];
  }

  if (obj === void 0) return Object.create(null);else if (objs.length === 0) return obj;else return mergeOperation(obj, merge.apply(undefined, objs));
};

var createResolvers = exports.createResolvers = function createResolvers() {
  for (var _len2 = arguments.length, resolvers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    resolvers[_key2] = arguments[_key2];
  }

  return merge.apply(undefined, _toConsumableArray(resolvers.map(function (Resolver) {
    assertClass(Resolver, '`createResolvers` accepts only a class');
    var resolver = new Resolver();
    assertHasMetaData(_enums.ResolverType, resolver, '`createResolvers` can accept only instance of GraphQLResolver');
    return resolver.Resolvers;
  })));
};

var Query = exports.Query = function Query(target, key) {
  Reflect.defineMetadata(_enums.OperationType, _enums.QueryOperation, target, key);
};

var Subscription = exports.Subscription = function Subscription(target, key) {
  Reflect.defineMetadata(_enums.OperationType, _enums.SubscriptionOperation, target, key);
};

var Mutation = exports.Mutation = function Mutation(target, key) {
  Reflect.defineMetadata(_enums.OperationType, _enums.MutationOperation, target, key);
};
//# sourceMappingURL=graphql-resolver.js.map