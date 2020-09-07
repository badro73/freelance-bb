import axios from "axios";
import { API_Customers } from '../config';



 function findAll()
{
    return  axios.get(API_Customers)
            .then(response =>response.data['hydra:member'])
   
}

 function deleteCostumer(id)
{
    return axios.delete(API_Customers+'/'+id)
}


export default {
findAll,
delete: deleteCostumer
};



