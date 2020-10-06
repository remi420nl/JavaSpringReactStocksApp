
import React, { Component , useEffect, useState} from 'react'
import {Button} from '@material-ui/core';
import { List, ListItem,ListItemText} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {Signup} from '../../api';

 const Confirmation = (props) => {
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const {values: {firstname, lastname,email, username,city,education,info,password }} = props

    const {values} = props;
    const rows = []


    useEffect(() => {
        console.log('values', values)
        for(var value in values){
         if(values.hasOwnProperty(value)){
           const fieldData = values[value];
           rows.push(fieldData);
         } }
        setData(rows)
       },[])

    function handleclick (e,option) {
        e.preventDefault()
        if(option === 'confirm'){
         
      Signup(generateResponse()).then(response => {
        console.log('Response ' , response);
        if(response.status === 200){
          props.success('/login');
          return;
        }  
      })
      setError("Er is iets fout gegaan");
      }}

    function errormessage(){
        return  <p style={{color: "red"}}>{error}</p>
      }

function generateResponse(){
  return {
    "username" : username.value,
    "firstname" : firstname.value,
    "lastname" : lastname.value,
    "password" : password.value,
    "email" : email.value,
    "city" : city.value
  }
}


    return(
<div className="confirmpage">
<h3>Overzicht</h3>
 <List>
 {data.map(value => 
  <div className="confirmation" key = {value.name}>
   
         <ListItem alignItems="flex-start"
          key = {value.name}>
         <ListItemText
        
              primary={value.label}
              secondary={
                <React.Fragment>
                  {value.value}
                </React.Fragment>
              }
            />
         
         </ListItem>
        
   <Divider variant="inset" component="li" /></div>
    )}
 </List>
 {errormessage()}
 <div className="buttons">
           <Button
              color="primary"
              variant="contained"
              onClick={(e) => handleclick(e,'confirm')}
            >Bevestigen</Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={(e) => handleclick(e,'prev')}
            >Terug</Button>
        </div>
</div>
        
    )
}

export default Confirmation