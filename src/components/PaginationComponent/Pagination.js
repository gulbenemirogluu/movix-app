import React from "react";
import { Pagination } from "react-bootstrap";
export const PaginationComponent = ({currentPage, setCurrentPage}) => {
  const mod = currentPage % 10;
  return (
    <Pagination>
      <Pagination.First disabled={currentPage === 1} onClick={()=>setCurrentPage(1)}  />
      <Pagination.Prev  disabled={currentPage === 1} onClick={()=>setCurrentPage(currentPage-1)} />
      {currentPage > 10 && (
        <>
          {currentPage < 20 && <Pagination.Item onClick={()=>setCurrentPage(1)}>{1}</Pagination.Item>}
          {currentPage > 20 && (
            <Pagination.Item onClick={()=>setCurrentPage(currentPage - (mod + 10))}>{currentPage - (mod + 10)}</Pagination.Item>
          )}
         <Pagination.Ellipsis />
        </>
      )}
      {currentPage > 2 && <Pagination.Item onClick={()=>setCurrentPage(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
      {currentPage > 1 && <Pagination.Item onClick={()=>setCurrentPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {currentPage < 499 && <Pagination.Item onClick={()=>setCurrentPage(currentPage +1)}>{currentPage + 1}</Pagination.Item>}
      {currentPage < 498 && <Pagination.Item onClick={()=>setCurrentPage(currentPage +2)}>{currentPage + 2}</Pagination.Item>}
      {currentPage < 490 && (
        <>
          <Pagination.Ellipsis />
          {<Pagination.Item onClick={()=>setCurrentPage(currentPage+20-mod)}>{currentPage+20-mod}</Pagination.Item>}
        </>
      )}
      <Pagination.Next disabled={currentPage === 499} onClick={()=>setCurrentPage(currentPage+1)}/>
      <Pagination.Last disabled={currentPage === 499} onClick={()=>setCurrentPage(500)}/>
    </Pagination>
  );
};
