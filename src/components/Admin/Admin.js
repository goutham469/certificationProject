import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

function Admin() {
    const [authorized,setAuthorized] = useState(false);
    const [users,setUsers] = useState([])

    function success(response)
    {
        response = jwtDecode(response.credential)
        if(response.email === process.env.REACT_APP_ADMIN_EMAIL)
        {setAuthorized(true)}
        else{alert("it is not registered admin email id !")}
    }
    async function getData()
    {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/Author/getAuthors`).
        then(data=>data.json()).
        then(data=>setUsers(data.payload)).
        catch(err=>alert('unable to fetch server\nmay ne the server is not running\n or you internet connection is lost !'));
    }
    useEffect(()=>{
        getData();
    },[])

  return (
    <div>
        <h1>Admin</h1>
        {
            authorized ?
            <div>
                <p>you are authorized</p>
                <div>
                    <h3>all users</h3>
                    {
                        users.map(user=>
                            <div style={{backgroundColor:"#95d183",borderRadius:"10px",margin:"5px",display:"flex",justifyContent:"space-around",padding:"5px"}}>
                                {
                                    user.profilePicture&&user.profilePicture[0]&&user.profilePicture[0].profilePicture ?
                                    <img style={{borderRadius:"10px"}} width="80px" src={user.profilePicture[0].profilePicture}/>
                                    :
                                    <lable>profile pic not set</lable>
                                }
                                <b>user :- {user.email}</b>
                                <b>password :- {user.password}</b>
                                <p> upvoted articles :- 
                                    {
                                        user.upVotedArticles.map(x=><b>{x},</b>)
                                    }
                                </p>
                                <p> downvoted articles :- 
                                    {
                                        user.downVotedArticles.map(x=><b>{x},</b>)
                                    }
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
            :
            <center>
                <form style={{width:"300px", backgroundColor:"black",borderRadius:"10px",padding:"40px",color:"white",textAlign:"left"}}>
                    <h4>Admin login</h4>
                    <p>-&gt;this admin page is acceible for only the <b>Admin email id</b></p>
                    <p>-&gt;other a/c credentials are not valid!</p>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
                        <GoogleLogin 
                        onSuccess={success}
                        />
                    </GoogleOAuthProvider>
                </form>
            </center>
        }
    </div>
  )
}

export default Admin