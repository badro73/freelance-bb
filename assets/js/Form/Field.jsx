import React from 'react'

const Field=({type,placeholder,handleChange,value,name})=>{ 

    return (

        <div className="form-group">
              <label htmlFor={name}>{name}</label>
            <input type={type} 
            className="form-control" 
            placeholder={placeholder}
            onChange={handleChange} 
            name={name}
            value={value} required/>
        </div>

    )

}

export default Field;