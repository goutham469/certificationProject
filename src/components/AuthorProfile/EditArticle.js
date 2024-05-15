import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './AuthorProfile.css'

function EditArticle() {
    let state = useLocation()
    
    state=state.state
    console.log(state)

    let [title,updateTitle]=useState(state.title);
    let [category,updateCategory]=useState(state.category)
    let [content,updateContent]=useState(state.content);

    let [titleStatus,updateTitleStatus]=useState(false)
    let [categoryStatus,updateCategoryStatus]=useState(false)
    let [contentStatus,updateContentStatus]=useState(false)

    async function setLastUpdate()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/articles/updateLastEdit`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"articleId":state.articleId})
        })
        
    }

    async function deleteArticle()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/articles/DeleteArticle`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"articleId":state.articleId})
        })
        
    }
    async function changeTitle()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/articles/ChangeTitle`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"articleId":state.articleId,"changedTitle":title})
        }).then(data=>data.json()).then(data=>alert(`status : ${data.status}`))
        
        setLastUpdate()
        
    }
    async function changeCategory()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/articles/ChangeCategory`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"articleId":state.articleId,"changedCategory":category})
        }).then(data=>data.json()).then(data=>alert(`status : ${data.status}`))

        setLastUpdate()
        
    }
    async function changeContent()
    {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
        await fetch(`${base_url}/articles/ChangeContent`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"articleId":state.articleId,"changedContent":content})
        }).then(data=>data.json()).then(data=>alert(`status : ${data.status}`))

        setLastUpdate()
    }

  return (
    <div className='row'>
        <h1 className='text-danger'>Edit Article</h1>
        <div className='col-lg-4'></div>
        <div className='border border-danger m-3 col-lg-3'>

            <button className='btn btn-danger' onClick={()=>{deleteArticle()}}>Delete</button><br/>

            {
                titleStatus==false?<div>
                    <label>title : <b>{title}</b></label><button className='btn btn-success m-2' onClick={()=>{updateTitleStatus(true)}}>Change</button><br/>
                </div>:
                <div>
                    <input type='text' value={title} onChange={(event)=>{updateTitle(event.target.value)}}/> <button className='btn btn-success m-2' onClick={()=>{updateTitleStatus(false);changeTitle()}}>Update</button>
                </div>
            }
            
            <br/>

            {
                categoryStatus==false?<div>
                    <label>category : <b>{category}</b></label><button className='btn btn-success m-2' onClick={()=>{updateCategoryStatus(true)}}>Change</button><br/>
                </div>:
                <div>
                    <input type='text' value={category} onChange={(event)=>{updateCategory(event.target.value)}}/> <button className='btn btn-success m-2' onClick={()=>{updateCategoryStatus(false);changeCategory()}}>Update</button>
                </div>
            }
           
            <br/>
            {
                contentStatus==false?<div>
                    <div className='EditArticleParaScroll'>{
                        content.map((value,key)=>
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
                    }</div>
                    <br/>
                    <button className='btn btn-success' onClick={()=>{updateContentStatus(true)}}>Change</button>
                </div>:<div>
                    {
                        content.map((value,key)=>
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

                    {/* <textarea className='EditArticleTextArea' value={content} onChange={(event)=>{updateContent(event.target.value)}}></textarea> <button className='btn btn-success m-2' onClick={()=>{updateContentStatus(false);changeContent()}}>Update</button>
                 */}
                </div>
            }
            
            <br/>

        </div>
    </div>
  )
}

export default EditArticle