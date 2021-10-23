import { FETCH_DATA } from "./ActionTypes";

const initialState = {
    data:[]
}

const reducer = (state = initialState,action) =>{
    switch (action.type) {

        case FETCH_DATA: console.log(action.payload) 
        return {

            ...state,
            data:action.payload
        }
    
        default: return state
    }
}

export default reducer;