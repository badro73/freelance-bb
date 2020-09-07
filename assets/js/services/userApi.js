import axios from 'axios';
import { API_Users } from '../config/Config';


function registre(form)

{
    return axios.post(API_Users,form)
}




export default 
{
    registre
}


