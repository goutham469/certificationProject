import React from 'react'
import './userDashboard.css'

function UserProfile() {
  return (
    <div>
        <h2>UserProfile</h2>
        <div className='col-lg-5 m-1 personalInfoTab'>
            <h3 className='text-danger'>user activity</h3>
            <label>Total days active : count</label>
            <button className='btn btn-primary m-1'>Liked posts</button>
            <button className='btn btn-primary m-1'>saved posts</button>
            <button className='btn btn-primary m-1'>upvoted posts</button>
            <button className='btn btn-primary m-1'>downvoted posts</button>
        </div>
    </div>
  )
}

export default UserProfile