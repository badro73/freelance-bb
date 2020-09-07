import React from 'react'
import { useState, useEffect } from 'react';
import Field from '../Form/Field';
import axios from 'axios';
import custumerAPI from '../services/custumerAPI';
import {Link } from 'react-router-dom';

const CostumerPage=({match,history})=>{

const [costumer, setCostumer]= useState({firstName:"",lastName:"",email:"",company:""});

const { id = "new" } = match.params;
useEffect(() => {
    if (id != "new")
    {    
        consumerget(id);
    }
    
    },[id]);

const handleChange =(event) => {

    const value  = event.target.value;
    const name = event.target.name;

    setCostumer({...costumer,[name]:value});
}

const handleSubmit= async (event) => {
    event.preventDefault();
    //Authentificaton();
    console.log(costumer);

    if (id != "new")
    {
        try {
            const result= await custumerAPI.custumerPut(costumer,id);
            console.log(result);
            history.push('/costomers/'+id)
            
        } catch (error) {
            console.log(error)
        }

    }
    else 
    {
        try {
            const result= await custumerAPI.custumerPost(costumer);
            console.log(result);
            history.replace('/costumers')

            
        } catch (error) {
            console.log(error)
        }

    }

}

const consumerget=async (id)=>
{  
    try {
        await axios.get('http://127.0.0.1:8000/api/customers/'+id)
        .then(res => { 
            const editCustumer={firstName:res.data.firstName,lastName:res.data.lastName,email:res.data.email,company:res.data.company};
            setCostumer(editCustumer);
        })
    } catch (error) {
        console.log(error)
    }

}

return (
<>
<div className="mb-3 d-flex justify-content-between align-items-center">
    <h1>Ajouter un costumer</h1>
</div>

<form onSubmit={handleSubmit} >

        <Field  type="text"  placeholder="nom de famille du client" handleChange={handleChange} value = {costumer.firstName} name="firstName"/>
        <Field  type="text"  placeholder="Prénom du client" handleChange={handleChange} value ={costumer.lastName} name="lastName"/>
        <Field  type="email" placeholder="email du client" handleChange={handleChange} value ={costumer.email} name="email" />
        <Field  type="text"  placeholder="l'entreprise du client" handleChange={handleChange} value ={costumer.company} name="company" />
        <div>
                 <button className="btn btn-primary" type="submit" value="Submit"> Enregistrer </button>
                 <Link to="/costumers" className="btn btn-link">
                 retour à la liste </Link>
        </div>

</form>

</>


)


}

export  default CostumerPage;