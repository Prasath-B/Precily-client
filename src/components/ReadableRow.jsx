import React,{useState} from 'react'

const ReadableRow = ({dat ,updateValue, id, name}) => {

    const [edit, setedit] = useState(false)  
    const [inputValue, setinputValue] = useState(dat)

    return ( <>
        {edit ? 

        <td ><input type="text" 
        onChange={(e)=>setinputValue(e.target.value)} 
        value={inputValue}
        onKeyPress = {(e)=>{  
        updateValue(e,id,name,inputValue) 
        e.key === 'Enter' ? setedit(false) : setedit(true)
        }}
  
        /></td> 
        : <td onDoubleClick ={(e)=>setedit(true)}>{dat}</td>  }
        
        
              </>  )
                
               
            
}

export default ReadableRow
