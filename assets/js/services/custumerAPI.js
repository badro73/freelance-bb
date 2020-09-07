import React from 'react'
import axios from 'axios';
import { API_Customers } from '../config';




function custumerPut (custumer,id)
{
    return axios.put(API_Customers+'/'+id,custumer)
                .then(response => response.data);
}

function custumerPost(custumer)
{
    return axios.post(API_Customers,custumer)
    .then(response => response.data);

}



export default
{
    custumerPut,
    custumerPost

}