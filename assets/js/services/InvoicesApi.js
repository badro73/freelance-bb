import axios from "axios";
import { API_Invoices } from '../config';

function findAll()
{
    return axios.get(API_Invoices)
                .then(response =>response.data['hydra:member'])
}

function deleteInvoices(id)
{
    return  axios.delete(API_Invoices+'/'+id)
}


function invoicePut (invoice,id)
{
    return axios.put(API_Invoices+'/'+id,{...invoice,
            customer:'/api/customers/'+invoice.customer
      })
    .then(response => response.data);
}

function invoicePost(invoice)
{
    return axios.post(API_Invoices,{...invoice,
        customer: '/api/customers/'+invoice.customer
      })
    .then(response => response.data);

}


export default {
findAll,
delete: deleteInvoices,
invoicePost,
invoicePut

};



