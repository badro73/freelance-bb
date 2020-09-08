import React from 'react'
import { useState, useEffect } from 'react';
import Field from '../Form/Field';
import axios from 'axios';
import custumerAPI from '../services/custumerAPI';
import {Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_Customers } from '../config';
import { CommonLoading } from 'react-loadingg';

const CostumerPage=({match,history})=>{

const [costumer, setCostumer]= useState({firstName:"",lastName:"",email:"",company:""});
const [loading, setLoading] = useState(false);

const { id = "new" } = match.params;
useEffect(() => {
    if (id != "new")
    {    
        setLoading(true)
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
    setLoading(true)
    if (id != "new")
    {
       
        try {
            const result= await custumerAPI.custumerPut(costumer,id);
            setLoading(false)
            toast.success("le Client a été modifier avec succée");
            history.push('/costomers/'+id)
        } catch (error) {
            toast.error("impossible de modifier le client");
            setLoading(false);
        }

    }
    else 
    {
        try {
            const result= await custumerAPI.custumerPost(costumer);
            setLoading(false)
            toast.success("le Client a été ajouté avec succée");
            history.replace('/costumers')
        } catch (error) {
            setLoading(false)
            toast.error("impossible d'ajouter un client");
        }

    }

}

const consumerget=async (id)=>
{  
    try {
        await axios.get(API_Customers+'/'+id)
        .then(res => { 
            const editCustumer={firstName:res.data.firstName,lastName:res.data.lastName,email:res.data.email,company:res.data.company};
            setLoading(false)
            setCostumer(editCustumer);
           
        })
    } catch (error) {
        toast.error("le client n\'existe pas");
    }

}

return (
<>
{id != "new" &&
<div className="mb-3 d-flex justify-content-between align-items-center">
    <h1> Modifier un customer</h1>
</div>
|| <div className="mb-3 d-flex justify-content-between align-items-center">
    <h1> Ajouter un customer</h1>
</div>}
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
{loading && <CommonLoading />}

</>


)


}

export  default CostumerPage;