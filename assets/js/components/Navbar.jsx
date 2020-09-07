import React from 'react';
import {NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const Navbar=({logout,isAuthenticated,onLogin,history})=>{

const deconnected=()=>{

  logout();
  onLogin(false);
  toast.dark("Vous etes déconnecté");
  history.push('/connexion')
}

return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <NavLink  className="navbar-brand" to="/">Freelance</NavLink >
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor01">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink  className="nav-link" to="/invoices">Factures</NavLink >
      </li>
      <li className="nav-item">
        <NavLink  className="nav-link" to="/costumers">Clients</NavLink >
      </li>
    </ul>
    
    <ul className="navbar-nav ml-auto">
      {!isAuthenticated && <>
      <li className="nav-item">
        <NavLink className="nav nav-link" to="/inscription">Inscription</NavLink>
      </li>
      <li className="nav-item">
        <NavLink  className="btn btn-success" to="/connexion" >Connexion</NavLink >
      </li>
      </> 
      }
      {isAuthenticated &&
      <li className="nav-item">
        <button className="btn btn-danger" onClick={deconnected}>Déconnexion</button>
      </li>
      }
    </ul>
  </div>
</nav>


);

}

export default Navbar;