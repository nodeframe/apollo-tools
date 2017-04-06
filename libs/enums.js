"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PropertyNameMap;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OperationType = exports.OperationType = Symbol("GraphQLOperationType");
var ResolverType = exports.ResolverType = Symbol("ResolverType");

var QueryOperation = exports.QueryOperation = Symbol("QueryOperation");
var SubscriptionOperation = exports.SubscriptionOperation = Symbol("SubscriptionOperation");
var MutationOperation = exports.MutationOperation = Symbol("MutationOperation");

var PropertyNameMap = exports.PropertyNameMap = (_PropertyNameMap = {}, _defineProperty(_PropertyNameMap, QueryOperation, "Query"), _defineProperty(_PropertyNameMap, SubscriptionOperation, "Subscription"), _defineProperty(_PropertyNameMap, MutationOperation, "Mutation"), _PropertyNameMap);
//# sourceMappingURL=enums.js.map