import React from 'react';
import {Link} from 'react-router-dom';


const Navbar=({logout,isAuthenticated,onLogin,history})=>{


const deconnected=()=>{

  logout();
  onLogin(false);
  history.push('/connexion')
}

return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <Link className="navbar-brand" to="/">Freelance</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor01">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/invoices">Factures</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/costumers">Clients</Link>
      </li>
    </ul>
    
    <ul className="navbar-nav ml-auto">
      {!isAuthenticated && <>
      <li className="nav-item">
        <a className="nav nav-link">inscription</a>
      </li>
      <li className="nav-item">
        <Link className="btn btn-success" to="/connexion" >Connexion</Link>
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