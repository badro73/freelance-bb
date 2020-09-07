import React from 'react'
import axios from 'axios';



function custumerPut (custumer,id)
{
    return axios.put('http://127.0.0.1:8000/api/customers/'+id,custumer)
                .then(response => response.data);
}

function custumerPost(custumer)
{
    return axios.post('http://127.0.0.1:8000/api/customers',custumer)
    .then(response => response.data);

}



export default
{
    custumerPut,
    custumerPost

}