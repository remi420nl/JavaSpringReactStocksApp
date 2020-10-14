import React, { Component, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PersonalDataForm=(props)=> {
const [data, setData] = useState([])
const {values, change} = props;
const [error,setError] = useState({})
const rows = [];

function nextpage (e) {
    setError(props.next())
}

useEffect(() => {
 for(var value in values){
  if(values.hasOwnProperty(value)){
    const fieldData = values[value];
    rows.push(fieldData);
  }
 }
 setData(rows)
},[])

function handleChange (e,field) {
  change(e,field)
  }


return (
    <div className = "signupForm">
        <>
            <AppBar title="Enter Personal Details" />
{data.map(value =>   
 <TextField
 onBlur={(e) =>{if(e.target.value.length < 3) {
   const oldErrors = error;
   setError({...oldErrors,[`${value.name}`]: "Te kort, minimaal 2 karakers"} ) 
  
  } }}
 key={value.name}
 label= {value.label}
 type={value.name}
 onChange={(e) => handleChange(e, value.name)}
 defaultValue = {value.value}
 helperText= {error[`${value.name}`]}
 FormHelperTextProps={{
  style:{color: 'red'}
  
}}
inputProps={{ min : 3 }}
requiered={true}
 />)}
      <div className="signupbuttons">
           <Button 
              color="primary"
              variant="contained"
              onClick={nextpage}
            >Volgende</Button>
       </div>
        </>
      
</div>
)
}

export default PersonalDataForm