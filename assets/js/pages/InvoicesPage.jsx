
import React, { useState ,useEffect } from 'react'
import Field from '../Form/Field';
import Select from '../Form/Select';
import ConsumerApi from '../services/ConsumerApi';
import {Link } from 'react-router-dom';
import InvoicesApi from '../services/InvoicesApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_Invoices } from '../config';
import { CommonLoading } from 'react-loadingg';

const InvoicesPage=({match,history})=>{

const { id = "new" } = match.params;

const [invoice,setInvoice] = useState({

    amount:"",
    customer:"",
    status:"PAID"
})
const [loading, setLoading] = useState(false);

const [client, setClient] = useState([]);

useEffect(() => { setLoading(true);
     fetchCustomers()},[]);

useEffect(() => {
    if (id != "new")
    { 
        setLoading(true)
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
    setLoading(false)
    setClient(Allconstumers)
  } 
  catch (error) 
  {
    toast.error("impossible de charger les clients");

  }
  
}

const handleSubmit= async (event) => 
{
    event.preventDefault();
    setLoading(true)
    if (id != "new")
    {
        try 
        {
            const result= await InvoicesApi.invoicePut(invoice,id);
            setLoading(false);
            toast.success("la facture a été modifier");
            history.push('/invoices/'+id)
        } catch (error) {
            setLoading(false);
            toast.error("impossible de modifier la facture");
        }

    }
    else 
    {
        try {
            const result= await InvoicesApi.invoicePost(invoice);
            setLoading(false);
            toast.success("la facture a été ajouté");
            history.replace('/invoices')
        } catch (error) {
            setLoading(false);
            toast.error("impossible d'ajouté une facture");
        }

    }

}

const invoiceget=async (id)=>
{
    try {
        await axios.get(API_Invoices+'/'+id)
        .then(res => {
            const editinvoice={amount:res.data.amount,customer:res.data.customer.id,status:res.data.status};
            setLoading(false);
            setInvoice(editinvoice);
        })
    } catch (error) {
        toast.error("impossible de récupéré la facture");
    }
}

    return (

        <div>
            {id != "new" &&
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h1> Modifier une facture</h1>
                </div>
            || <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h1> Ajouter une facture</h1>
                </div>
            }
          
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
            {loading && <CommonLoading />}         
        </div>
    )


}

export default InvoicesPage;