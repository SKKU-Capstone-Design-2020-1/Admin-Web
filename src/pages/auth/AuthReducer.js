const initAuth = {
    test: false,
}

const authReducer = (state = initAuth, action) => {
    switch (action.type) {
        case state.test: {
            return state;
        }
        default: 
            return state;
    }
}

export default authReducer; 