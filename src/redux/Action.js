import { FETCH_DATA } from "./ActionTypes";
import axios from 'axios'

 const addData = (data)=>{
    return {
        type: FETCH_DATA,
        payload: data
    }
}


export const fetchData = () =>{
    return (dispatch =>{
        
        axios.get("https://hidden-castle-58728.herokuapp.com/data")
            .then(response =>  {
                const data = response.data;
                dispatch(addData(data))
            })
            .catch(error =>{
                const err_msg = error.message
                console.log(err_msg);
            })
    })
}