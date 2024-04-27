import React, { useEffect, useState } from 'react'
import store from '../../store';
import './AuthorProfile.css'
import { BiUpvote } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiDownvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";


function MyArticles() {
  let [articlesData,updateArticlesData] = useState([]);
  useEffect(()=>{
    // console.log(store.getState())
    fetch(`http://localhost:4000/articles/getByAuthorName/?name=${store.getState().username}`).then(x=>x.json()).then(x=>updateArticlesData(x.articles));
    // console.log(articlesData)
  })
  return (
    <div>
        <h2 className='text-danger'>My Articles</h2>
        <div>
          {
            articlesData.map(x=><div className='row articleWindow'>
              <div className='col-lg-4'>last edit {x.lastUpdate}</div>
              <div className='col-lg-4'>Title :-{x.title}</div>
              <div className='col-lg-4'>posted on {x.dateOfCreation}</div>
              <div className='col-lg-3'></div>
              <div className='col-lg-2'></div>
              <div className='col-lg-12 bg bg-success'><b className='text-warning'>Content</b><br/>{x.content}</div>
              <div className='col-lg-2'><MdRemoveRedEye/> :{x.views}</div>
              <div className='col-lg-4'><BiUpvote/> : {x.upVotes}</div>
              <div className='col-lg-4'><BiDownvote/> : {x.downVotes}</div>
              <div className='col-lg-1'><FaCommentDots/></div>
              <div className={`${x._id} col-lg-4`}>{x.comments.map(y=><div className='bg bg-primary m-1'><b>{y.userName}</b><br/>
                                                                  <p>{y.comment}</p>
                                                                  <BiUpvote/><label> : {y.upVotes}</label>
                                                                  <BiDownvote/><label> : {y.downVotes}</label><br/>
                                                                  </div>)}</div>
            </div>)
          }
        </div>
    </div>
  )
}

export default MyArticles