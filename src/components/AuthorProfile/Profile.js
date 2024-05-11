import React, { useEffect, useState } from 'react';
import store from '../../store';
import './AuthorProfile.css';

function Profile() {
  const [authorData, updateAuthorData] = useState({});
  const [publicationDataOutside,updatePublicationDataOutside] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base_url = process.env.REACT_APP_SERVER_BASE_URL;
        const response = await fetch(`${base_url}/Author/getPublicationData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: store.getState().username })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        updateAuthorData(data.publicationData);
      } catch (error) {
        console.error('An error occurred:', error);
      }

      const base_url = process.env.REACT_APP_SERVER_BASE_URL;
      await fetch(`${base_url}/user/getPublicationData`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"email":store.getState().username})
      }).then(data=>data.json()).then(y=>{console.log(y);updatePublicationDataOutside(y.data);})

      console.log(publicationDataOutside.total_articles_published)
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <h2 className='text-warning'>Profile</h2>
      <div className='row'>
        <div className='col-lg-5 m-1 personalInfoTab'>
          <h3 className='text-danger'>Personal info</h3>
          <label>username : </label>
          <b>{store.getState().username}</b>
          <br />
          {
            (authorData.password && <label>password : <b>{authorData.password}</b></label>)?<label>password : <b>{authorData.password}</b></label>:<label>password : <b>problem at server</b></label>
          }
          <br/><br/>
          <button className='btn btn-info'>change Password</button>
        </div>
        <div className='col-lg-5 m-1 personalInfoTab'>
          <h3 className='text-danger'>Publication Data</h3>
          <label>articles published : <b>{publicationDataOutside && publicationDataOutside.total_articles_published}</b></label><br />
          <label>total article views : <b>{publicationDataOutside && publicationDataOutside.total_article_views}</b></label><br />
          <label>total article upvotes : <b>{publicationDataOutside && publicationDataOutside.total_upVotes}</b></label><br />
          <label>total article downvotes : <b>{publicationDataOutside && publicationDataOutside.total_downVotes}</b></label><br />
          <label>total article comments : <b>{publicationDataOutside && publicationDataOutside.total_article_comments}</b></label><br /><br />


          <label>single highest</label>
          <label>highest views : <b>{publicationDataOutside.highest_single_view && publicationDataOutside.highest_single_view.count}</b></label>                <a href=''>{publicationDataOutside.highest_single_view && publicationDataOutside.highest_single_view.articleId}</a><br />
          <label>highest upvotes : <b>{publicationDataOutside.highest_single_upVotes && publicationDataOutside.highest_single_upVotes.count}</b></label>        <a href=''>{publicationDataOutside.highest_single_upVotes && publicationDataOutside.highest_single_upVotes.articleId}</a><br />
          <label>highest downvotes : <b>{publicationDataOutside.highest_single_downVotes && publicationDataOutside.highest_single_downVotes.count}</b></label>  <a href=''>{publicationDataOutside.highest_single_downVotes && publicationDataOutside.highest_single_downVotes.articleId}</a><br />
          <label>highest comments : <b>{publicationDataOutside.highest_single_comments && publicationDataOutside.highest_single_comments.count}</b></label>     <a href=''>{publicationDataOutside.highest_single_comments && publicationDataOutside.highest_single_comments.articleId}</a><br />
        </div>
        <div className='col-lg-5 m-1 personalInfoTab'>
          <h3 className='text-danger'>user activity</h3>
          <label>Total days active : count</label>
          <button className='btn btn-primary m-1'>Liked posts</button>
          <button className='btn btn-primary m-1'>saved posts</button>
          <button className='btn btn-primary m-1'>upvoted posts</button>
          <button className='btn btn-primary m-1'>downvoted posts</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
