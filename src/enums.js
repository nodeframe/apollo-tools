
export const OperationType = Symbol("GraphQLOperationType")
export const ResolverType = Symbol("ResolverType")

export const QueryOperation = Symbol("QueryOperation")
export const SubscriptionOperation = Symbol("SubscriptionOperation")
export const MutationOperation = Symbol("MutationOperation")

export const PropertyNameMap = {
  [QueryOperation]:"Query",
  [SubscriptionOperation]:"Subscription",
  [MutationOperation]:"Mutation"
}