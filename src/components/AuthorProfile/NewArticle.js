import React from 'react'
import './AuthorProfile.css'
import { useState } from 'react';
import store from '../../store';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";

function NewArticle() {

    let currentDate = new Date();
    let navigate=useNavigate();
    

    let [title,updateTitle]=useState();
    let [category1,updateCategory]=useState()
    let [body,updateBody]=useState([]);

    let [paraBody,updateParaBody]=useState('');
    let [boldTextBody,updateBoldTextBody]=useState('');
    let [imageChoosen,updateImageChoosen]=useState('');

    let [titleError,updateTitleError]=useState()
    let [categoryError,updateCategoryError]=useState()
    let [bodyError,updateBodyError]=useState()
    let [changeState,updateChangeState]=useState(4)

    async function post(event)
    {
        event.preventDefault();
        if(title!=null && title!=undefined)
        {
            updateTitleError();
            if(category1!=null && title!=undefined)
            {
                updateCategoryError();
                if(body!=null && body!=undefined)
                {
                    updateBodyError();
                    let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                    // console.log("base url in new article page",base_url);
                    await fetch(`${base_url}/articles/getArticleId`).then(data=>data.json()).then(async (x)=>{
                        // console.log(x);
                        let articleData = {
                            articleId:x.count,
                            title:title,
                            category:category1,
                            author:store.getState().username,
                            content:body,
                            dateOfCreation:`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} - ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
                            lastUpdate:`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} - ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
                            lastVersions:[],
                            views:1,
                            comments:[],
                            upVotes:0,
                            downVotes:0
                        }
                        console.log(articleData);
                        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
                        await fetch(`${base_url}/articles/postArticle`,{
                            method:'POST',
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify(articleData)
                        }).then(x=>x.json()).then(x=>{
                            // console.log(x)
                            // alert(x.message)
                            navigate('/AuthorProfile/MyArticles')
                            
                        })
                        
                    })
                    
                }
                else{updateBodyError('* null body is not allowed *')}
            }else{updateCategoryError('* null categery is not allowed *')}
        }else{updateTitleError('* null title is not allowed *')}
    }
    function addParagraph(event)
    {
        event.preventDefault();
        if(paraBody)
        {
            updateBodyError('')
            updateBody(previousData=>[...previousData,{'p':paraBody}])
            updateParaBody('')
            updateChangeState(4)
        }
        else
        {
            updateBodyError('paragraph cannot be empty')
        }
    }
    function addHeading(event)
    {
        event.preventDefault();
        if(boldTextBody)
        {
            updateBodyError('')
            updateBody(previousData=>[...previousData,{'b':boldTextBody}])
            updateParaBody('')
            updateChangeState(4)
        }
        else
        {
            updateBodyError('heading cannot be empty')
        }
    }
    

    async function addImageToBody(event) {
        event.preventDefault();
    
        const imageFile = event.target.files[0];
    
        if (imageFile) {
          // Prepare form data
          const formData = new FormData();
          formData.append("photo", imageFile);
    
          try {
            // Send image file to server
            let baseUrl = process.env.REACT_APP_SERVER_BASE_URL;
            const response = await fetch(`${baseUrl}/media/uploadImage`, {
              method: 'POST',
              body: formData
            });
    
            const data = await response.json();
    
            if (response.ok) {
              // Update body state with the new image URL
              console.log(data,data.file,data.file.path)
              updateBody(previousData => [...previousData, { 'img': data.file.path }]);
              updateParaBody('');
              updateChangeState(4);
              console.log(body); // This will show the previous state due to async nature
              alert('Image uploaded successfully');
            } else {
              alert('Image upload failed');
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Image upload failed');
          }
        } else {
          alert('No image selected');
        }
      

            
        
    }
  return (
    <div className='formField'>
        <h2 className='text-warning'>Post new article</h2>
        <div className='row'>
            <div className='col-lg-4 sampleArticleToBePublished'>
                {
                    body.map((value,key)=>{
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
                    })
                }
            </div>

            <form className='col-lg-6 m-2'>
                <input className='title m-2' placeholder='title' onChange={(event)=>{updateTitle(event.target.value)}}/><br/>
                <p className='text-danger'>{titleError}</p>

                <input className='m-2 title' placeholder='categery' onChange={(event)=>{updateCategory(event.target.value)}} ></input>
                    <br/>
                <p className='text-danger'>{categoryError}</p>

                {
                    (changeState==1)?
                    <div>
                        <textarea className='body-area m-2' placeholder='body' onChange={(event)=>{updateParaBody(event.target.value)}}/><br/>
                        <button onClick={(event)=>{addParagraph(event)}}><FaCheck size={30}/></button>
                    </div>:
                    (changeState==2)?
                    <div>
                        <input className='m-2' type='text' placeholder='heading' onChange={(event)=>{updateBoldTextBody(event.target.value)}}/>
                        <button onClick={(event)=>{addHeading(event)}}><FaCheck size={30}/></button>
                    </div>:
                    (changeState==3)?
                    <div>
                        <input className='m-2' type='file' onChange={(event)=>addImageToBody(event)}/>
                    </div>:
                    <div>
                        click below buttons to add elements
                    </div>
                    
                }

                <p className='text-danger'>{bodyError}</p>


                <div className='row'>
                    <div className='col-lg-3 btn btn-info m-2' onClick={()=>{updateChangeState(1)}}>+Para</div>
                    <div className='col-lg-3 btn btn-info m-2' onClick={()=>{updateChangeState(2)}}>+Heading</div>
                    <div className='col-lg-3 btn btn-info m-2' onClick={()=>{updateChangeState(3)}}>+Image</div>
                </div> 

                <button className='btn btn-success m-2' onClick={(event)=>{post(event)}}>POST</button>
            </form>
        </div>
        
    </div>
  )
}

export default NewArticle