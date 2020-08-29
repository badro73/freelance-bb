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
import {HashRouter,Switch,Route,Router} from 'react-router-dom';
import Costumers from './pages/Costumers';
import Invoices from './pages/Invoices';


// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('hellow world');

const App=()=>
{ return <HashRouter> 

<Navbar/> 

    <main className="contrainer pt-5" >
        <Switch>
            <Route path="/costumers" component={Costumers} />
            <Route path="/invoices" component={Invoices} />
            <Route path="/" component={Homepage}/>
        </Switch>
    </main>


</HashRouter>
}


const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>,rootElement);
