import React from 'react'

// <Pagination currentPage={currentPage} changeCurrentPage={changeCurrentPage} page={page} />
const Pagination=({currentPage,changeCurrentPage,consumerPage})=>{

  const page=[];
  for (var i=1;i<=consumerPage;i++)
  {
      page.push(i);
  }

    return (

<div>
  <ul className="pagination pagination-sm">
    <li className={"page-item " + (currentPage === 1 &&  "disabled")}>
    <button className="page-link" onClick={()=>changeCurrentPage(currentPage - 1)}>&laquo;</button>
    </li>
    {page.map((page) =>

    <li key={page} className={"page-item " + (currentPage === page && "active")}>
      <button className="page-link" onClick={()=>changeCurrentPage(page)}> {page} </button>
    </li>

     )}
  
    <li className={"page-item " + (currentPage === consumerPage &&  "disabled")}>
    <button className="page-link" onClick={()=>changeCurrentPage(currentPage + 1)}>&raquo;</button>
    </li>
  </ul>
</div>



    );



}


export default Pagination;