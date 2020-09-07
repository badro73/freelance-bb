
import React, { useState ,useEffect } from 'react'
import Field from '../Form/Field';
import Select from '../Form/Select';
import ConsumerApi from '../services/ConsumerApi';
import {Link } from 'react-router-dom';
import InvoicesApi from '../services/InvoicesApi';
import axios from 'axios';

const InvoicesPage=({match,history})=>{

const { id = "new" } = match.params;

const [invoice,setInvoice] = useState({

    amount:"",
    customer:"",
    status:"PAID"
})

const [client, setClient] = useState([]);

useEffect(() => {fetchCustomers()},[]);
useEffect(() => {
    if (id != "new")
    { 
        invoiceget(id);
    }
    
    },[id]);


const handleChange =(event) => {

    const value  = event.target.value;
    const name = event.target.name;

    setInvoice({...invoice,[name]:value});
}


const fetchCustomers= async () =>
{
  try {
    const Allconstumers = await ConsumerApi.findAll();

   
    invoice.customer=Allconstumers[0].id;
    console.log(invoice.customer);
    setClient(Allconstumers)
  } 
  catch (error) 
  {
  console.log(error);
  
  }
  
}

const handleSubmit= async (event) => 
{
    event.preventDefault();
    if (id != "new")
    {
        try {
            const result= await InvoicesApi.invoicePut(invoice,id);
            console.log(result);
            history.push('/invoices/'+id)
            
        } catch (error) {
            console.log(error)
        }

    }
    else 
    {
        try {
            const result= await InvoicesApi.invoicePost(invoice);
            console.log(result);
            history.replace('/invoices')
        } catch (error) {
            console.log(error.response)
        }

    }

}

const invoiceget=async (id)=>
{
    try {
        await axios.get('http://127.0.0.1:8000/api/invoices/'+id)
        .then(res => {
            const editinvoice={amount:res.data.amount,customer:res.data.customer.id,status:res.data.status};
            
            setInvoice(editinvoice);
        })
    } catch (error) {
        console.log(error)
    }
}

    return (

        <div>
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h1>Ajouter une facture</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <Field  type="number"  placeholder="montant de la facture" handleChange={handleChange} value = {invoice.amount} name="amount"/>
                <Select name ="customer" value={invoice.customer} error ="" handleChange={handleChange}>
                {client.map((client) => 
                    
                    <option key={client.id} value={client.id}>{client.firsName} {client.lastName}</option>
                    
                )}    
                </Select>

                <Select name ="status" value={invoice.status} error ="" handleChange={handleChange}>
                <option value="PAID">payée</option>
                <option value="CANCELLED">annulée</option>
                <option value="SENT">envoyée</option>
                </Select>
                <div>
                 <button className="btn btn-primary" type="submit" value="Submit"> Enregistrer </button>
                 <Link to="/invoices" className="btn btn-link">
                 retour à la liste </Link>
        </div>
            </form>           
        </div>
    )


}

export default InvoicesPage;