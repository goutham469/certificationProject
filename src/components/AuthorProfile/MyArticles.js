import React, { useEffect, useState } from 'react'
import store from '../../store';
import './AuthorProfile.css'
import { BiUpvote } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import { BiDownvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


function MyArticles() {
  let navigate = useNavigate()
  let [articlesData,updateArticlesData] = useState([]);
  useEffect(()=>{
    // console.log(store.getState())
    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
    fetch(`${base_url}/articles/getByAuthorName/?name=${store.getState().username}`).then(x=>x.json()).then(x=>updateArticlesData(x.articles));
    // console.log(articlesData)
  })

  function openEditArticleWindow(event,x)
  {

    event.preventDefault()
    console.log(x)
    navigate('/AuthorProfile/EditArticle',{state:x});

  }
  return (
    <div>
        <h2 className='text-warning'>My Articles</h2>
        <div className='row'>
          {
            articlesData.map(x=><div className='col-lg-5 col-sm-5 col-12 row articleWindow'>

              <div className='col-lg-4'><button className='btn AllArticlesEditButton' onClick={(event)=>{openEditArticleWindow(event,x)}}>edit</button></div>

              <div className='col-lg-4'>last edit {x.lastUpdate}</div>
              <div className='col-lg-4'>Title :-{x.title}</div>
              <div className='col-lg-4'>posted on {x.dateOfCreation}</div>
              <div className='col-lg-3'></div>
              <div className='col-lg-2'></div>
              <div className='col-lg-12 bg bg-success'>
                <b className='text-warning'>Content</b>
                <br/>
                <div>
                  {
                    x.content.map((value,key)=>
                      {
                        if(value.p)
                          {
                            return <p>{value.p}</p>
                          }
                        else if(value.b)
                          {
                            return <div><br/><b>{value.b}</b><br/></div>
                          }
                        else if(value.img)
                          {
                            return <img width="300px" src={value.img}></img>
                          }
                      }
                    )
                  }
                </div>
              </div>
              <div className='col-lg-2'><MdRemoveRedEye/> :{x.views}</div>
              <div className='col-lg-4'><BiUpvote/> : {x.upVotes}</div>
              <div className='col-lg-4'><BiDownvote/> : {x.downVotes}</div>
              <div className='col-lg-1'><FaCommentDots/></div>
              <div className={`${x._id} col-lg-12 MyarticlesSetMaxHeightWithScrolling`}>{x.comments.map(y=><div className='bg bg-success m-1'><b>{y.userName}</b><br/>
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