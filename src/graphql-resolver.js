import "reflect-metadata";

import {
  OperationType,
  ResolverType,
  QueryOperation,
  SubscriptionOperation,
  MutationOperation,
  PropertyNameMap} from './enums'

export class GraphQLResolver {

  constructor() {
    Reflect.defineMetadata(ResolverType, true, this)
  }

  get Resolvers() {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter((propertyName) => propertyName !== "constructor" && Reflect.getMetadata(OperationType, this, propertyName))
      .reduce((schma, propertyName) => {
        const type = Reflect.getMetadata(OperationType, this, propertyName)
        return { ...schma,
          [PropertyNameMap[type]]: { ...schma[PropertyNameMap[type]],
            [propertyName]: this[propertyName].bind(this)
          }
        }
      }, Object.create(null))
  }
}

const assertClass = (Resolver, errorMessage) => {
  if (typeof Resolver !== 'function') {
    throw new Error(errorMessage)
  }
}
const assertHasMetaData = (key, obj, errorMessage) => {
  if (!Reflect.getMetadata(ResolverType, obj))
    throw new Error(errorMessage)
}

export const mergeOperation = (obj1, obj2) => {
  const mergedObj = {
    [PropertyNameMap[QueryOperation]]: { ...(obj1[PropertyNameMap[QueryOperation]] || {}),
      ...(obj2[PropertyNameMap[QueryOperation]] || {})
    },
    [PropertyNameMap[MutationOperation]]: { ...(obj1[PropertyNameMap[MutationOperation]] || {}),
      ...(obj2[PropertyNameMap[MutationOperation]] || {})
    },
    [PropertyNameMap[SubscriptionOperation]]: { ...(obj1[PropertyNameMap[SubscriptionOperation]] || {}),
      ...(obj2[PropertyNameMap[SubscriptionOperation]] || {})
    },
  }
  return mergedObj
}

const merge = (obj, ...objs) => {
  if (obj === void 0) return Object.create(null)
  else if (objs.length === 0) return obj
  else return mergeOperation(obj, merge(...objs))
}

export const createResolvers = (...resolvers) => {
  return merge(
    ...resolvers.map(Resolver => {
      assertClass(Resolver, '`createResolvers` accepts only a class')
      const resolver = new Resolver()
      assertHasMetaData(ResolverType, resolver, '`createResolvers` can accept only instance of GraphQLResolver')
      return resolver.Resolvers
    })
  )
}

export const Query = (target, key) => {
  Reflect.defineMetadata(OperationType, QueryOperation, target, key)
}

export const Subscription = (target, key) => {
  Reflect.defineMetadata(OperationType, SubscriptionOperation, target, key)
}

export const Mutation = (target, key) => {
  Reflect.defineMetadata(OperationType, MutationOperation, target, key)
}