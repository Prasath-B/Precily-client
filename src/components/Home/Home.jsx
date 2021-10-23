import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import { fetchData } from "../../redux/Action";
import axios from 'axios'
import ReadableRow from '../ReadableRow';
import './Home.css'

const Home = ({data,fetchData}) => {

    const [newData, setnewData] = useState({
        username:'',
        phone:'',
        title:'',
        email:''
    })

    const deleteRow =(e,data)=>{
        e.preventDefault();
         const id = data._id;
         axios.post('https://hidden-castle-58728.herokuapp.com/delete',{
             id
         }) 
     }

     
     const handleSubmit = (e)=>{
        e.preventDefault();
          axios.post('https://hidden-castle-58728.herokuapp.com/',{
             newData
         }).then((res)=>{
             setnewData({
                username:'',
                phone:'',
                title:'',
                email:''
            })
         }).catch(err=>console.log(err)) 
     }

    useEffect(() => {
        fetchData()   
    },[deleteRow,handleSubmit])


     const updateValue = (e,id,name,inputValue) =>{

             if(e.key === 'Enter'){   
             const filter = data.filter((dat)=> dat._id === id)
             const result = filter[0]
             result[name] = inputValue;
            
            axios.post('https://hidden-castle-58728.herokuapp.com/update',{
               result
            }).then((res)=>{
                console.log(res)
            })
            .catch((err)=>console.log(err))
         
             }
     }




   return  <div className='tabtwo-page'>
        <table className='table table-dark'>
        <thead>
        <tr>
            <th scope="col">Username</th>   
            <th scope="col" >Mobile</th>
            <th scope="col" >Address</th>
            <th scope="col" >Email</th>
        </tr>           
        </thead>
    <tbody > 
        {data.map((dat)=>(
            
            <tr key={dat._id}  >
                  <ReadableRow  scope='row'  dat ={dat.name}   id={dat._id}     name ='name'     updateValue={updateValue}  />  
                  <ReadableRow   dat ={dat.phone}  id={dat._id}     name='phone'     updateValue={updateValue}  />   
                  <ReadableRow   dat ={dat.title}  id={dat._id}     name='title'     updateValue={updateValue}  />  
                  <ReadableRow    dat ={dat.email}  id={dat._id}     name='email'     updateValue={updateValue}  /> 
                 <td className='btn btn-lg btn-danger delet' onClick={(e)=>deleteRow(e,dat)}>Delete</td> 
                 
            </tr> 
            
      
        ))}
       
        </tbody>
       </table>
        <form className='add-row'>
            <h3 className='new-title'>Add new Row</h3>
            <input type="text"
            name='username'
            placeholder='Username'
            onChange={(e)=>setnewData({...newData,username:e.target.value})}
            value={newData.username}
             />
            <input type="text"
            name='phone'
            placeholder='Phone'
            onChange={(e)=>setnewData({...newData,phone:e.target.value})}
            value={newData.phone}
             />
            <input type="text"
            name='title'
            placeholder='Title'
            onChange={(e)=>setnewData({...newData,title:e.target.value})}
            value={newData.title}
             />
            <input type="text"
            name='email'
            placeholder='E-mail'
            onChange={(e)=>setnewData({...newData,email:e.target.value})}
            value={newData.email}
             />
            <button className='btn btn-lg btn-primary' onClick={handleSubmit}>Submit</button>
        </form> 
       </div>
       
}

const mapStatetoProps = state =>{
    return {
        data: state.data
    }
}

const mapDispatchtoProps = dispatch =>{
    return {
        fetchData: ()=> dispatch(fetchData()),
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Home);

