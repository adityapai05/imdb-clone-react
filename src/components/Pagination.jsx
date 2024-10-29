import React from 'react'

function Pagination({ page, handlePrev, handleNext, totalPages }) {
  return (
    <div className="bg-custom-dark text-white p-4 mt-8 flex items-center justify-center space-x-6 rounded-lg shadow-md">
      <button 
        className={`px-4 py-2 rounded-lg bg-button-grey hover:bg-button-hover duration-300 
                    ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`} 
        onClick={handlePrev} 
        disabled={page === 1}
      >
        <i className="fa-solid fa-arrow-left"></i> Prev
      </button>
      
      <span className="text-lg font-semibold">
        Page {page} of {totalPages}
      </span>

      <button 
        className={`px-4 py-2 rounded-lg bg-button-grey hover:bg-button-hover duration-300 
                    ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`} 
        onClick={handleNext} 
        disabled={page === totalPages}
      >
        Next <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}


export default Pagination