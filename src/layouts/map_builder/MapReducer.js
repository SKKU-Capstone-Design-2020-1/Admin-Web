import Backend from 'react-dnd-html5-backend';

const initState = {
    backend: Backend
}

const mapReducer = (state = initState, action) => {
    switch (action.type){
        default: 
            return state;
    }
}

export default mapReducer;