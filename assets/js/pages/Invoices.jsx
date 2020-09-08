import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import * as moment from 'moment';
import InvoicesApi from '../services/InvoicesApi';
import {Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommonLoading } from 'react-loadingg';


const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
  };
  
  const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"};



const Invoices=()=>{



    const [data, setData] = useState([]);
    const [currentPage,setCurrentPage]= useState(1);
    const [invoicesPage,setInvoicesPage]=useState(5);
    const [search,setSearch]=useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
        Allinvoices();
        
    },[]);

    const Allinvoices = async ()=> 
    {
        try {
            const invoicesData= await InvoicesApi.findAll()
            setLoading(false)
            setData(invoicesData);
        } catch (error) {
            toast.error("impossible de charger les Facture");
        }
    }

    function changeCurrentPage(page)
    {
    setCurrentPage(page)
    }

    const handleChange = event => {
        setSearch(event.target.value);
        setCurrentPage(1);
      }
      
      
      const filteredCustomers = data.filter(
        i =>
          i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
          i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
          i.status.toLowerCase().includes(search.toLowerCase()) ||
          i.amount.toString().startsWith(search.toLowerCase()) ||
          STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
      );

    const totaPage=data.length;
   
    const invoicesPerPage= Math.ceil(totaPage/invoicesPage);

    //get current costumer
    const indexOfLastPost=currentPage * invoicesPerPage;
    const indexOfFirstPost=indexOfLastPost -invoicesPerPage;
    const currentData=filteredCustomers.slice(indexOfFirstPost,indexOfLastPost);


    return (

        <>

    <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des Factures</h1>
            <Link to="/invoices/new" className="btn btn-primary">
            Créer une facture
            </Link>
    </div>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Search" id="search" onChange={handleChange} value={search} />
        </div>
                <table className="table table-hover">
                {!loading && ( <thead>
                    <tr>
                    <th scope="col">id.</th>
                    <th scope="col">firstName </th>
                    <th scope="col">lastName</th>
                    <th scope="col">sentAt</th>
                    <th scope="col">status</th>
                    <th scope="col">amount</th>
                    
                    </tr>
                </thead>
                        )
                }

                <tbody>

                {currentData.map((data) => 
                    <tr key={data.id} className="table">
                    <th scope="row">{data.chrono}</th>
                    <td>{data.customer.firstName}</td>
                    <td>{data.customer.lastName}</td>
                    <td>{ moment(data.sentAt).format('DD/MM/YYYY')}</td>
                    <td><span className={"badge badge-"+STATUS_CLASSES[data.status]} >{STATUS_LABELS[data.status]}</span></td>
                    <td>{data.amount}</td>
                    <td>  <Link to={"/invoices/"+data.id} className="btn btn-primary btn-sm"> Edite</Link></td>
                    </tr>
                    )
                    }
                </tbody>
                </table> 
                <Pagination currentPage={currentPage} changeCurrentPage={changeCurrentPage} consumerPage={invoicesPage} />
                {loading && <CommonLoading />}
        </>



    )



}


export default Invoices;