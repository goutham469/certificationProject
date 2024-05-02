import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import './AuthorProfile.css'
import { useNavigate } from 'react-router-dom';

import { BiUpvote } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiDownvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";

import store from '../../store'

function AllArticles() {
    let navigate=useNavigate();
    let [postsData,updatePostsData]=useState([])
    useEffect(()=>{
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        fetch(`${base_url}/articles/getAll`).then(data=>data.json()).then(x=>updatePostsData(x.articles));
    })
    async function IncrementViews(id)
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        await fetch(`${base_url}/articles/IncrementView/?id=${id}`)

    }

    async function IncrementUpVotes(id)
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        await fetch(`${base_url}/articles/upVote/?id=${id}`)
    }

    async function IncrementDownVotes(id)
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        await fetch(`${base_url}/articles/downVote/?id=${id}`)
    }
    async function postAComment(id)
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL
        let commentData = prompt("enter comment");
        console.log(commentData,store.getState().username)
        let obj = {"comment":commentData,"userName":store.getState().username}

        await fetch(`${base_url}/articles/PostComment/?articleId=${id}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        }).then(data=>data.json()).then(z=>{console.log(z);alert("comment posted")}).catch(err=>alert(err))
    }
  return (
    <div className='row'>
        <h2 className='text-warning'>All articles</h2>
        {
                postsData.map(x=><div className='col-lg-3 m-1 row'>
                    <div className='userBlogContentItem' 
                    // onClick={(event)=>{event.preventDefault();window.open('/AuthorProfile/FullArticle')}}
                    >
                        <div className='col-lg-10 p-3 text-primary'><center><b>{x.title}</b></center></div>
                        <div className='col-lg-10'><a href={``}><b>{x.author}</b></a></div>
                        <div className='col-lg-10'>category : <b>{x.categery}</b></div>

                        <div className='col-lg-10'>posted on : <b>{x.dateOfCreation}</b></div>
                        <div className='col-lg-10'>lastly modified on : <b>{x.lastUpdate}</b></div>

                        <div className='col-lg-12'>
                            <div className='articleData007'>{x.content}</div>
                        </div>
                        <div className='col-lg-12 row'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-4'><button className='incrementDecrementButton' ><MdRemoveRedEye color='blue' onClick={()=>{IncrementViews(x.articleId);}}/></button> :{x.views}</div>
                            <div className='col-lg-4  col-md-4 col-sm-4 col-4'><button className='incrementDecrementButton' ><BiUpvote color='green' onClick={()=>{IncrementUpVotes(x.articleId);}}/></button> : {x.upVotes}</div>
                            <div className='col-lg-4  col-md-4 col-sm-4 col-4'><button className='incrementDecrementButton' ><BiDownvote color='red' onClick={()=>{IncrementDownVotes(x.articleId);}}/></button>  : {x.downVotes}</div>
                        </div>
                        <div className='col-lg-1'><button  className='incrementDecrementButton FaCommentDotssetpadding' onClick={()=>{postAComment(x.articleId)}}><FaCommentDots/></button></div>
                        <div className={`${x._id} col-lg-12`}>{x.comments.map(y=>
                                                                            <div className='comments0052 m-1'><b>{y.userName}</b><br/>
                                                                                <p>{y.comment}</p>
                                                                                <BiUpvote/><label> : {y.upVotes}</label>
                                                                                <BiDownvote/><label> : {y.downVotes}</label><br/>
                                                                            </div>)}
                        </div>
                        
                    </div>
                </div>)
            }
    </div>
  )
}

export default AllArticles