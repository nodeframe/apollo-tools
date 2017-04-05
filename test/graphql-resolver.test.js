import * as GraphQLTools from '../src'
import expect, { createSpy, spyOn, isSpy } from 'expect'

describe("GraphQL Resolver Class",function(){

  describe("should generate correct resolver object for single query",function(){
    class Comment extends GraphQLTools.GraphQLResolver {
      @GraphQLTools.Query
      comments(){
        
      }     
    }
    const comment = new Comment()
    var spy = expect.spyOn(comment, 'comments') 
    const obj = Symbol("obj"),context = Symbol("context"),args = Symbol("args"),info=Symbol("info")
    comment.Resolvers.Query.comments(obj,args,context,info)

    it('should has only one Query property',function(){
      expect(Object.getOwnPropertyNames(comment.Resolvers)).toEqual(["Query"])
    })

    it('should has only one comments query inside',function(){
     expect(Object.getOwnPropertyNames(comment.Resolvers.Query)).toEqual(["comments"])
    })
  
    it('should has the same comments function as an object',function(){
      expect(comment.comments.bind(comment)).toEqual(comment.Resolvers.Query.comments)
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith(obj,args,context,info)
    })
  })

  describe("should generate correct resolver object for multiple query",function(){
    class Comment extends GraphQLTools.GraphQLResolver {
      @GraphQLTools.Query
      comments(){
        
      }  

      @GraphQLTools.Query
      comment(){
        
      }   
    }
    const comment = new Comment()

     it('should has only one Query property',function(){
      expect(Object.getOwnPropertyNames(comment.Resolvers)).toEqual(["Query"])
    })

    it('should has only 2 comments query inside',function(){
     expect(Object.getOwnPropertyNames(comment.Resolvers.Query)).toEqual(["comments","comment"])
    })

    it('should has the same comments function as an object',function(){
      expect(comment.comments.bind(comment)).toEqual(comment.Resolvers.Query.comments)
      expect(comment.comment.bind(comment)).toEqual(comment.Resolvers.Query.comment)
    })
  })

  describe("should generate correct resolver object for multiple query and multiple operation type",function(){
    class Comment extends GraphQLTools.GraphQLResolver {
      @GraphQLTools.Query
      comments(){
        
      }  
      @GraphQLTools.Query
      comment(){
        
      }  
      @GraphQLTools.Mutation
      addComment(){
        
      } 
      @GraphQLTools.Subscription
      commentAdded(){
        
      } 
    }
    const comment = new Comment()

    it('should has only 1 Query 1 Mutation and 1 Subscription property',function(){
      expect(Object.getOwnPropertyNames(comment.Resolvers)).toEqual(["Query","Mutation","Subscription"])
    })

    it('should has only 2 comments query 1 addComponent and 1 commentAdded inside',function(){
     expect(Object.getOwnPropertyNames(comment.Resolvers.Query)).toEqual(["comments","comment"])
     expect(Object.getOwnPropertyNames(comment.Resolvers.Mutation)).toEqual(["addComment"])
     expect(Object.getOwnPropertyNames(comment.Resolvers.Subscription)).toEqual(["commentAdded"])
    })
  })
})