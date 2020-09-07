/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// import react
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import {HashRouter,Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Costumers from './pages/Costumers';
import CostumerPage from './pages/CostumerPage';
import InscriptionPage from './pages/InscriptionPage';
import Invoices from './pages/Invoices';
import Connexion from './pages/Connexion';
import AuthentificationApi from './services/AuthentificationApi';
import { useState } from 'react';
import InvoicesPage from './pages/InvoicesPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

AuthentificationApi.setup();
const App=()=>
{ 
//isConnected= check if we are connected (check the availabilité of token)
    const [isAuthenticated, setIsAuthenticated] = useState(AuthentificationApi.isConnected);

    const NavbarWithRouter= withRouter(Navbar);

  const PrivateRout=({isAuthenticated,component,path})=>
  {
  return (isAuthenticated ? <Route path={path} component={component}/> : <Redirect to="/connexion"/>)
  }  
    
    return (
    <HashRouter> 

<NavbarWithRouter logout={AuthentificationApi.logAout}  isAuthenticated={isAuthenticated} onLogin={setIsAuthenticated}/> 

    <main className="container pt-5" >
        <Switch>
            <Route path="/inscription" component={InscriptionPage}/>
            <Route path="/connexion" render={(props)=>( <Connexion onLogin={setIsAuthenticated} {...props} />  ) } />
            <PrivateRout path="/invoices/:id" component={InvoicesPage} isAuthenticated={isAuthenticated}  />
            <PrivateRout path="/costomers/:id" component={CostumerPage} isAuthenticated={isAuthenticated}  />
            <PrivateRout path="/costumers" component={Costumers} isAuthenticated={isAuthenticated}  />
            <PrivateRout path="/invoices" component={Invoices} isAuthenticated={isAuthenticated} />
            <Route path="/" component={Homepage}/>
        </Switch>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
    </main>


</HashRouter>
    )
}


const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>,rootElement);
