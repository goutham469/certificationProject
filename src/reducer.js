export default function reducer(state = { signed: false, username: '', userType: '' }, action) {
    switch (action.type) {
        case 'SignIn':
        case 'SignUp':
            const now = new Date();
            const expireTime = now.getTime() + 60 * 1000; // 60 seconds
            now.setTime(expireTime);
            document.cookie = `username=${action.userName}; expires=${now.toUTCString()}; path=/;`;
            document.cookie = `userType=${action.userType}; expires=${now.toUTCString()}; path=/;`;
            return { ...state, signed: true, username: action.userName, userType: action.userType };
        case 'LogOut':
            // Clear the username and userType cookies when logging out
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            return { ...state, signed: false, username: '', userType: '' };
        default:
            return state;
    }
}
