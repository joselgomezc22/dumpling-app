import { useState } from "react";

export const DataListFilter = ({ filters }) => {
  const [first, setFirst] = useState(null);
  return (
    <div className="dt-filters">
      <div className="dt-filters__col">
        <div className="dt-filters__label">
          <img
            className="dt-filters-icon"
            src="src/images/filter-icon.svg"
            alt=""
          />
          <h2 className="text-m-bold">Filters</h2>
        </div>
        <div className="dt-filters-item">
          <img
            className="dt-filters-icon"
            src="src/images/filter-icon.svg"
            alt=""
          />
          <h2 className="text-m-bold">Order status</h2>
          <img
            className="dt-filters-arrow-icon"
            src="src/images/filter-arrow.svg"
            alt=""
          />
        </div>
        <div className="dt-filters-item">
          <img
            className="dt-filters-icon"
            src="src/images/filter-icon.svg"
            alt=""
          />
          <h2 className="text-m-bold">Delivery date</h2>
          <img
            className="dt-filters-arrow-icon"
            src="src/images/filter-arrow.svg"
            alt=""
          />
        </div>
        <div className="dt-filters-item">
          <img
            className="dt-filters-icon"
            src="src/images/filter-icon.svg"
            alt=""
          />
          <h2 className="text-m-bold">Assigned shopper</h2>
          <img
            className="dt-filters-arrow-icon"
            src="src/images/filter-arrow.svg"
            alt=""
          />
        </div>
        <div></div>
      </div>
      <div className="dt-filters__col">
        <label className="dt-filters__search">
        <img
            className="dt-filters-search-icon"
            src="src/images/search-icon.svg"
            alt=""
          />
          <input placeholder="Search" className="dt-filters__search-input" type="text" />
        </label>
      </div>
    </div>
  );
};
