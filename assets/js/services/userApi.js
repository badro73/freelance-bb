import axios from 'axios';


function registre(form)

{
    return axios.post('http://127.0.0.1:8000/api/users',form)
}




export default 
{
    registre
}


