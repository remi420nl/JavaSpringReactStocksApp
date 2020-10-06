import React, { Component } from 'react'
import {DetailsForm,PersonalDataForm,Confirmation,Success} from '.';

export class SignupForm extends Component {
    state = {
        page: 1,
        firstname: {name: 'firstname', label:"Voornaam", value : '', placeholder : 'testplaceholder'},
        lastname:  {name: 'lastname',label:"Achternaam", value : ''},
        username:  {name: 'username',label:"Gebruikersnaam", value: ''},
        password:  {name: 'password',label:"Wachtwoord", value: ''},
        email: {name: 'email',label:"E-Mail Adres", value: ''},
        city:  {name: 'city',label:"Woonplaats", value: ''},
        education:  {name: 'education',label:"Opleiding", value: ''},
        info:  {name: 'info',label:"Informatie", value: ''},
    }

handleChange = (event,input) => {
    const key = input;
    const value = event.target.value;
   
    this.setState(previousState => ({
        [key] : { ...previousState[key], value :  value}
    }))
}

nextPage = () => {
    console.log('page ', this.state.page)
const {page} = this.state;
this.setState({
    page:page +1
});}

prevPage = () => {
    const {page} = this.state;
    this.setState({
        page:page -1
    });}

    handleSuccesfulAuth = (page) => {
        this.props.history.push(page)
    }

    render() {
        const {page, firstname, lastname, city, email, username,password, education,info} = this.state;
        const firstvalues = {firstname, lastname,username, password};
        const secondvalues = {city,education,info,email};
        const totalvalues = {...firstvalues, ...secondvalues}

        switch(page){
            case 1: return(
            <PersonalDataForm 
            next={this.nextPage}
            change={(e,v) => this.handleChange(e,v)} values = {firstvalues}/>
            )
            case 2: return(
            <DetailsForm
            next={this.nextPage}
            prev={this.prevPage}
            change={(e,v) => this.handleChange(e,v)}  values = {secondvalues}/>
            )
            case 3: return(
            <Confirmation
            next={this.nextPage}
            prev={this.prevPage}
            values = {totalvalues}
            success = {this.handleSuccesfulAuth} />
            )
            case 4: return(
            <Success
            next={this.nextPage}
            prev={this.prevPage}
            name = { firstname['value'] +' '+ lastname['value']}
           />
            )
        }

        return (
            <div>
                
            </div>
        )
    }
}

export default SignupForm
