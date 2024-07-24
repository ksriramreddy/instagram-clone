
import { retry } from '@reduxjs/toolkit/query'
import {create} from 'zustand'

const usePostsStore = create((set)=>({
    posts : [],
    createPost : (post)=> set(state=>({posts:[post,...state.posts]})),
    setPosts : (posts)=> set(state=>({posts})),
    deletePost : (id)=> set(state=>({posts:state.posts.filter(post=>post.id!=id)})) ,
    addComment : (postId,comment)=> set(state=>({
        posts : state.posts.map(post=>{
            if(post.id==postId){
                return {
                    ...post,
                    comments : [...post.comments , comment]
                }
            }
            return post
        })
    }))
}))

export default usePostsStore