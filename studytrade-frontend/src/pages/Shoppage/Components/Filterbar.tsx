import React, { useState, ChangeEvent } from 'react';

interface FilterBarProps {
  toggleCategories: () => void;
}

function FilterBar({ toggleCategories }: FilterBarProps) {
  const [selectedCondition, setSelectedCondition] = useState('all');

  const handleConditionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCondition(event.target.value);
  };

  const filter = () =>{
    document.querySelector("#filter")?.classList.toggle("hidden");
  }
  return (<div>
    <div className=" w-full ">
      <div className="flex p-2 justify-center">
        <button className="lg:hidden " onClick={toggleCategories}>
          <i className="bi bi-filter"></i>
          Categories
        </button>
        <button className="pl-3 lg:hidden" onClick={filter}>
          <i className="bi bi-funnel hover:bi-funnel-fill"></i>
        </button>
      </div>
      <div className="hidden" id="filter">
        <div className='flex justify-center'>
          <h1 className='p-2 font-bold'>Condition:</h1>
          <select value={selectedCondition} onChange={handleConditionChange} className='p-2 rounded-lg text-center bg-white text-black border-2 hover:border-black font-bold'>
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="nearly new">Nearly new</option>
            <option value="used">Used</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  );
}

export default FilterBar;
