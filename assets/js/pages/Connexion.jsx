import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthentificationApi from '../services/AuthentificationApi';
import { Redirect } from 'react-router';
import Costumers from '../pages/Costumers';
import { toast } from 'react-toastify';
import { SemipolarLoading } from 'react-loadingg';




const Connexion=({onLogin,history})=>{



    const [form, setForm] = useState({
        username:'' ,
        password:'' 
      });
    const [loading, setLoading] = useState(false);
    const handleChange =(event) => {

        const value  = event.target.value;
        const name = event.target.name;

        setForm({...form,[name]:value});
    }
    const handleSubmit= (event) => {
        event.preventDefault();
        Authentificaton();
    }

    const Authentificaton= async()=>{

        try {
            setLoading(true);
            const token = await AuthentificationApi.Authentification(form);
            var isConnected=checkToken(token);
         
            if(isConnected)
            {
                // permets de stocké le token d'application (inspect element)
                window.localStorage.setItem('authToken', token);
                //ajouter token pour que je reste connecté et je peux récupérer les donnée 
                axios.defaults.headers['Authorization'] = 'Bearer ' +token ;

                onLogin(true);
                toast.success("Vous êtes connecté !");
                history.replace("/costumers")
               
            }
        } catch (error) {
            toast.error("Le nom d'utilisateur ou le mot de passe est incorrect" );
            setLoading(false);

        }


    }

function checkToken(token)
{   
    const decoded = jwt_decode(token);
    if (token && decoded.exp)
    {
        if(new Date().getTime()<decoded.exp*1000)
        {

            return true
        }
        else
        {
            return false
        }
    }
    else
    {
        return false 
    }
}



return(
    <>
        <h1>Connexion</h1>
        {loading && <SemipolarLoading/> }
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="username" value={form.username}  onChange={handleChange}/>
            <small id="username" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={form.password}  onChange={handleChange}/>
            </div>

            <div>
                 <button className="btn btn-primary" type="submit" value="Submit"> Connexion </button>
            </div>
        </form>

    </>


)






}

export default Connexion;