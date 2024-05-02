import React from 'react'
import store from '../../store'
import './AuthorProfile.css'

function Profile() {
  return (
    <div>
      <h2 className='text-warning'>Profile</h2>
      <div className='row'>
      <div className='col-lg-5 m-1 personalInfoTab'>
        <h3 className='text-danger'>Personal info</h3>
        <label>username : </label>
        <b>{store.getState().username}</b>
        <br/>
        <label>password : <b>pass</b></label><br/><br/>
        <button className='btn btn-info'>change Password</button>
      </div>
      <div className='col-lg-5 m-1 personalInfoTab'>
        <h3 className='text-danger'>Publication Data</h3>
        <label>articles published : <b>count</b></label><br/>
        <label>overall</label><br/>
        <label>total article views : <b>count</b></label><br/>
        <label>total article upvotes : <b>count</b></label><br/>
        <label>total article downvotes : <b>count</b></label><br/>
        <label>total article comments : <b>count</b></label><br/><br/>

        <label>sigle highest</label>
        <label>highest views : <b>count</b></label> <label>article name(hyperlink to article by articleId)</label><br/>
        <label>highest upvotes : <b>count</b></label><br/>
        <label>highest downvotes : <b>count</b></label><br/>
        <label>highest comments : <b>count</b></label><br/>
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
  )
}

export default Profile