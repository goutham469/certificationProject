export default function reducer(state = { signed: false, username: '',userType:'' }, action) {
    switch (action.type) {
        case 'SignIn':
        case 'SignUp':
            return { ...state, signed: true,username:action.userName,userType:action.userType };
        case 'LogOut':
            return { ...state, signed: false,username:''};
        default:
            return state;
    }
}
