import axios from 'axios';
import { API_Users } from '../config';


function registre(form)

{
    return axios.post(API_Users,form)
}




export default 
{
    registre
}


