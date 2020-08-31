import axios from 'axios';
import jwt_decode from 'jwt-decode';


function Authentification (form)
{
    return axios.post('http://127.0.0.1:8000/api/login_check',form)
                .then(response => response.data.token);
}

function logAout()
{
    window.localStorage.removeItem('authToken');
    delete axios.defaults.headers['Authorization'] ;
}

function setup()
{
    const token=window.localStorage.getItem('authToken');
    
    if (token)
    {

        const decoded = jwt_decode(token);
        if(new Date().getTime()<decoded.exp*1000)
        {
            //je dois rajouter de bout de code pour je reste toujours connecté 
            //et Token toujours dispo meme si j'actualise la page 
            axios.defaults.headers['Authorization'] = 'Bearer ' +token ;
        }
        else
        {
            logAout();
        }
    }    
    else
    {
        logAout(); 
    }
}


function isConnected()
{
    const token=window.localStorage.getItem('authToken');
    if (token)
    {
        const decoded = jwt_decode(token);

        if(new Date().getTime()<decoded.exp*1000)
        {
            //je dois rajouter de bout de code pour je reste toujours connecté 
            //et Token toujours dispo meme si j'actualise la page 
           return true ;
        }
        else
        {
            return false;
        }
    }    
    else
    {
        return false;
    }
}


export default 
{
    Authentification,
    logAout,
    setup,
    isConnected
}