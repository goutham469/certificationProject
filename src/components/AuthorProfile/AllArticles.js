import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
// import './AuthorProfile.css'
import { useNavigate } from 'react-router-dom';

import { BiUpvote } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiDownvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

import store from '../../store'

import CommentWindow from './CommentWindow';
import { type } from '@testing-library/user-event/dist/type';

function AllArticles() {
    let navigate=useNavigate();
    let [postsData,updatePostsData]=useState([])
    let [showCommentWindow,updateCommentWindowStatus]=useState(false);
    let [commentWindowData,updateCommentWindowData]=useState([])

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

    async function openCommentWindow(data01)
    {

        // console.log("window opened",data01)

        updateCommentWindowData(data01);
        updateCommentWindowStatus(true);
        console.log(store.getState())
        store.dispatch({
            type:'CommentWindow',
            setWindowStatus:true
        })
        console.log(store.getState())
    }
    
    
  return (
    <div className='row allArticlesWindow'>
        <div className='toDisplayCommentBoxWithFlex'>
            {
                (store.getState().commentWindowStatus==true)?<CommentWindow data={commentWindowData} />:<div></div>
            }
        </div>
        <h2 className='text-warning'>All articles</h2>
        {
                postsData.map(x=><div className='col-lg-3 m-2 row'>
                    <div className='userBlogContentItem02' onClick={()=>{console.log(x)}} >

                        <div className='col-lg-10'><center><b className='textInCenter011'>{x.title}</b><sub className='m-1 fs-6'>-{x.category}</sub></center></div>

                        <div className='col-lg-12 row'>
                            <div className='col-lg-2'>
                                {
                                    (x.ProfilePicture)?<img src={x.ProfilePicture} alt={x.ProfilePicture}/>:
                                    <BsPersonCircle size={40}/>
                                }
                            </div>
                            <div className='col-lg-10 row'>
                                {/* author name,qualifications */}
                                <div className='col-lg-12'>
                                    <a href={``}><b>{x.author}</b></a><br/>
                                    {
                                        (x.authorQualification)?<b>{x.authorQualification}</b>:<b>new to Blog</b>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12 row'>
                            {/* author followers,posted,last edited */}
                            <div className='col-lg-4'>
                                {
                                    (x.Followers)?<p>{x.Followers} followers</p>:<p>no followers</p>
                                }
                            </div>
                            <div className='col-lg-7'>
                                posted on : {x.dateOfCreation}
                            </div>
                            {/* <div className='col-lg-5'>
                                modified on : {x.lastUpdate}
                            </div> */}
                        </div>
                        <div className='col-lg-12'>
                            <div className='articleData007'>{x.content}</div>
                        </div>
                        <div className='col-lg-12 row'>
                            <div className='col-lg-3 col-md-4 col-sm-4 col-4'><MdRemoveRedEye color='blue'/> {x.views}</div>
                            <div className='col-lg-3  col-md-4 col-sm-4 col-4'><button className='incrementDecrementButton' ><BiUpvote color='green' onClick={()=>{IncrementUpVotes(x.articleId);}}/></button> {x.upVotes}</div>
                            <div className='col-lg-3  col-md-4 col-sm-4 col-4'><button className='incrementDecrementButton' ><BiDownvote color='red' onClick={()=>{IncrementDownVotes(x.articleId);}}/></button>  {x.downVotes}</div>
                        
                        <div className='col-lg-3'><button  className='incrementDecrementButton FaCommentDotssetpadding' onClick={()=>{openCommentWindow(x)}}><FaCommentDots/><label className='AllArticlesTotalNoOfComments'>{String(x.comments.length)}</label></button></div>
                        </div>
                        
                        {/* <div className={`${x._id} col-lg-12`}>{x.comments.map(y=>
                                                                            <div className='comments0052 m-1'>
                                                                                <b>{y.userName}</b><br/>
                                                                                <p>{y.comment}</p>
                                                                                <BiUpvote/><label> : {y.upVotes}</label>   <BiDownvote/><label> : {y.downVotes}</label><br/>
                                                                            </div>
                                                                        )}
                        </div> */}
                        
                    </div>
                </div>)
            }
    </div>
  )
}

export default AllArticles