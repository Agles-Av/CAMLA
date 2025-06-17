export const AuthReducer = (
    state = {
        user: localStorage.getItem("user") || null,
        token: localStorage.getItem("token") || null
    },
    action
) => {
    switch(action.typr){
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        case "LOGOUT":
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return {
                user: null,
                token: null
            }
        default:
            return state;
    }
};