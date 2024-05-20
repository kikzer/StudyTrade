import React, { useState, ChangeEvent } from "react";

interface FilterBarProps {
  toggleCategories: () => void;
  fetchProducts: (
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    condition?: string
  ) => void;
}

function FilterBar({ toggleCategories, fetchProducts }: FilterBarProps) {
  const [selectedCondition, setSelectedCondition] = useState("all");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleConditionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCondition(event.target.value);
  };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };
  const filter = () => {
    document.querySelector("#filter")?.classList.toggle("hidden");
  };
  const filterButton = () => {
    fetchProducts(
      undefined,
      minPrice == "" ? 0 : Number(minPrice),
      maxPrice == "" ? 100000 : Number(maxPrice),
      selectedCondition
    );
  };


  return (
    <div>
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
          <div className="flex justify-center items-center flex-wrap">
            <h1 className="p-2">Condition:</h1>
            <select
              value={selectedCondition}
              onChange={handleConditionChange}
              className="p-1 rounded-lg text-center bg-white text-black border-2 hover:border-gray-500 "
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="nearly new">Nearly new</option>
              <option value="used">Used</option>
            </select>
            <div className="p-2 flex justify-center items-center flex-wrap">
              <h1 className="pr-2">Price:</h1>
              <input
                type="text"
                className="rounded border-2"
                placeholder="Min"
                id="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <h1 className="px-2">to</h1>
              <input
                type="text"
                className="rounded border-2"
                placeholder="Max"
                id="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
              <div
                className="text-[15px] ml-4 text-black hover:cursor-pointer border border-spacing-3 p-0.5 hover:border-gray-500 rounded-lg"
                onClick={filterButton}
              >
                Filter
              </div>
            </div>
          </div>
          <hr className="my-2 text-black" />
        </div>
      </div>
    </div>
  );  
}

export default FilterBar;