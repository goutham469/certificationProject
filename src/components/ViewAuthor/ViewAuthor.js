import React, { useState, useEffect } from 'react';
import './ViewAuthor.css';
import { useParams } from 'react-router-dom';

function ViewAuthor() {
    const { authorName } = useParams();
    const [authorData, setAuthorData] = useState(null);
    const [articles, setArticles] = useState([]);

    // Fetch author data
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/Author/getPublicationData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: authorName })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAuthorData(data.publicationData);
        })
        .catch(error => console.error('Error fetching author data:', error));
    }, [authorName]);

    // Fetch articles by author
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/articles/getByAuthorName/?name=${authorName}`)
        .then(response => response.json())
        .then(data => {
            setArticles(data.articles);
        })
        .catch(error => console.error('Error fetching articles:', error));
    }, [authorName]);

    if (!authorData) {
        return <p>Loading author data...</p>;
    }

    return (
        <div>
            <h1>{authorName}</h1>
            <div>
                <p>{authorData.email}</p>
                {
                    authorData.profilePicture[0]?.profilePicture ? (
                        <img style={{borderRadius:"20px"}} width="200px" src={authorData.profilePicture[0].profilePicture} alt="Profile" />
                    ) : (
                        <p>Profile picture not available</p>
                    )
                }
            </div>

            <h3>Posts</h3>
            <div style={{diaplay:"flex",justifyContent:"space-around",alignItems:"center",flexDirection:"column"}}>
                <center>
                    {
                        articles.map((post, index) => (
                            <div style={{width:"330px",backgroundColor:"white",borderRadius:"10px",margin:"10px"}} key={index}>
                                <b>{post.title}</b><br/>
                                {
                                    post.content.map((value, key) => {
                                        if (value.p) {
                                            return <p key={key}>{value.p}</p>;
                                        } else if (value.b) {
                                            return <div key={key}><br/><b>{value.b}</b><br/></div>;
                                        } else if (value.img) {
                                            return <div><br/><img style={{margin:"10px"}} key={key} className='m-2' width="300px" src={value.img} alt="Post Content" /><br/></div>
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                            </div>
                        ))
                    }
                </center>
            </div>
        </div>
    );
}

export default ViewAuthor;
