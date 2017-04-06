
Features
=======
- wite Resolver with es-decorator styke

you can write a resolver like this 

```javascript
  import GraphQLTools from '@nodeframe/apollo-tool'

  class CommentSchema extends GraphQLTools.GraphQLResolver {
    
    @GraphQLTools.Query
    comments(...){
      ...
    }

    @GraphQLTools.Query
    comment(...){
      ...
    }

    @GraphQLTools.Mutation
    addComment(...){
      ...
    } 

    @GraphQLTools.Subscription
    commentAdded(...){
      ...
    } 

  }
```

## Usage

```javascript
  const comment = new CommentSchema()
  
``` 

`comment.Resolvers` will be transformed to

```javascript
{
  Query:{
    comments(...){

    }
    comment(...){

    }
  },
  Mutation:{
    addComment(...){

    }
  },
  Subscription:{
    commentAdded(...){

    }
  }
}
```

## Utilities

You can merge many schemas with `GraphQLTools.createResolvers`

```javascript
GraphQLTools.createResolvers(
  CommentSchema,
  TaskSchema
)
```


