import React, { Component, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PersonalDataForm=(props)=> {
const [data, setData] = useState([])
const {values, change} = props;
const rows = [];

function nextpage (e) {

    // e.preventDefault();
    props.next()
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

function handleChange (e,v) {
change(e,v)
}

return (
    <div className = "signupForm">
        <>
            <AppBar title="Enter Personal Details" />
{data.map(value =>     <TextField
 key={value.name}
 label={value.label}
//  placeholder={value.firstname.placeholder}
 onChange={(e) => handleChange(e, value.name)}
 defaultValue = {value.value}
 />)}
      
           <Button
              color="primary"
              variant="contained"
              onClick={nextpage}
            >Volgende</Button>
       
        </>
      
</div>)
}

export default PersonalDataForm