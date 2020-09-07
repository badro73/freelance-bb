import axios from "axios";

function findAll()
{
    return axios.get('http://127.0.0.1:8000/api/invoices')
                .then(response =>response.data['hydra:member'])
}

function deleteInvoices(id)
{
    return  axios.delete('http://127.0.0.1:8000/api/invoices/'+id)
}


function invoicePut (invoice,id)
{
    return axios.put('http://127.0.0.1:8000/api/invoices/'+id,{...invoice,
            customer:'/api/customers/'+invoice.customer
      })
    .then(response => response.data);
}

function invoicePost(invoice)
{
    return axios.post('http://127.0.0.1:8000/api/invoices',{...invoice,
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



