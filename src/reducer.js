export default function reducer(state = { 
    signed: false,
    username: '',
    userType: '',
    commentWindowStatus:false,
    PersonalData:[],
    upVotedPosts:[],
    downVotedPosts:[],
    ProfileImageURL:'',
    savedPosts:[]
     }, action) {
        let base_url = process.env.REACT_APP_SERVER_BASE_URL;
    switch (action.type) {
        case 'SignIn':
        case 'SignUp':
            const now = new Date();
            const expireTime = now.getTime() + 600 * 1000; // 600 seconds
            now.setTime(expireTime);
            document.cookie = `username=${action.userName}; expires=${now.toUTCString()}; path=/;`;
            document.cookie = `userType=${action.userType}; expires=${now.toUTCString()}; path=/;`;

            return { ...state, signed: true, username: action.userName, userType: action.userType };
        case 'LogOut':
            // Clear the username and userType cookies when logging out
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            return { ...state, signed: false, username: '', userType: '' };
        case 'CommentWindow':
            return {...state,commentWindowStatus:action.setWindowStatus}
        case 'upVoteArticle':
            
             fetch(`${base_url}/Author/UpdateActivityUpvotes/?email=${state.username}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    type: "add",
                    articleId: action.articleId
                })
            })

            return {...state,upVotedPosts:[...state.upVotedPosts,action.articleId]}
        case 'removeUpVotedArticle':
            base_url = process.env.REACT_APP_SERVER_BASE_URL
             fetch(`${base_url}/Author/UpdateActivityUpvotes/?email=${state.username}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    type: "delete",
                    articleId: action.articleId
                })
            })

            return {...state,upVotedPosts:state.upVotedPosts.filter(x=>x !== action.articleId)}
        case 'downVoteArticle':
            base_url = process.env.REACT_APP_SERVER_BASE_URL
             fetch(`${base_url}/Author/UpdateActivityDownvotes/?email=${state.username}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    type: "add",
                    articleId: action.articleId
                })
            })

            return {...state,downVotedPosts:[...state.downVotedPosts,action.articleId]}
        case 'removeDownVotedArticle':
            base_url = process.env.REACT_APP_SERVER_BASE_URL
             fetch(`${base_url}/Author/UpdateActivityDownvotes/?email=${state.username}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    type: "delete",
                    articleId: action.articleId
                })
            })

            return {...state,downVotedPosts:state.downVotedPosts.filter(x=> x!==action.articleId)}

        default:
            return state;
    }
}
