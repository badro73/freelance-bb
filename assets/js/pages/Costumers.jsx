import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import ConsumerApi from '../services/ConsumerApi';


const Costumers=()=>{

    const [data, setData] = useState([]);
    const [currentPage,setCurrentPage]= useState(1);
    const [consumerPage,setConsumerPage]=useState(6);
    const [search,setSearch]=useState("");
    

useEffect(() => {fetchCustomers()},[]);

const fetchCustomers= async () =>
{
  try {
    const Allconstumers = await ConsumerApi.findAll();
    setData(Allconstumers)
  } 
  catch (error) 
  {
  
    
  }
  
}

const deleteConsumer= async (id)=>{

  const cloneData = [...data];
  const filtre =data.filter(c =>c.id !==id);
  setData(filtre)
  try {
    await ConsumerApi.delete(id)
    .then(response => {console.log('c\'est ok')})
  } catch (error) {
    setData(cloneData)
    console.log(error.response)
  }
  
}

function changeCurrentPage(page)
{
  setCurrentPage(page)
}

const handleChange = event => {
  setSearch(event.target.value);
  console.log(event.target.value);
  setCurrentPage(1);
}

const filteredCustomers = data.filter(
  c =>
    c.firstName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
);

const totaPage=filteredCustomers.length;
console.log(totaPage);
const consumerPerPage= Math.ceil(totaPage/consumerPage);


//get current costumer
const indexOfLastPost=currentPage * consumerPerPage;
const indexOfFirstPost=indexOfLastPost -consumerPerPage;
const currentData=filteredCustomers.slice(indexOfFirstPost,indexOfLastPost);



return ( 
<div>
<h1>Liste Costumers</h1>

<div className="form-group">
 
  <input type="text" className="form-control" placeholder="Search" id="search" onChange={handleChange} value={search} />
</div>

<table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">First Name </th>
      <th scope="col">Last Name</th>
      <th>Email</th>
      <th>Entreprise</th>
      <th className="text-center">Factures</th>
      <th className="text-center">Montant total</th>
      <th className="text-center"></th>


    </tr>
  </thead>
  <tbody>
  {currentData.map((currentData) => 
  
  <tr key={currentData.id} className="table">
      <th scope="row">{currentData.id}</th>
      <td>{currentData.firstName}</td>
      <td>{currentData.lastName}</td>  
      <td>{currentData.email}</td>
      <td>{currentData.company}</td>
      <td className="text-center">{currentData.invoices.length}</td> 
      <td className="text-center">{currentData.totalAmount.toLocaleString()}</td>
      <td className="text-center"> <button type="button" className="btn btn-danger" onClick={()=>{deleteConsumer(currentData.id)}} >Supprimer</button>  </td>
  </tr>
  )
}
   
  </tbody>
</table>
<Pagination currentPage={currentPage} changeCurrentPage={changeCurrentPage} consumerPage={consumerPage} />
</div>

);

}


export default  Costumers;