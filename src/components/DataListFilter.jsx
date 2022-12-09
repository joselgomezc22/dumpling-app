import { useState } from "react";

const StatusFilters = ({ statusFilters, setStatusFilter }) => {
  return (
    <>
      {statusFilters.filters.map((filter, index) => (
        <label className="dt-filters__status">
          <input
            checked={filter.active}
            
            type="checkbox"
            name=""
            id=""
          />
          <p className="text-m">
            {filter.label} ({filter.count})
          </p>
        </label>
      ))}
    </>
  );
};

export const DataListFilter = ({ filters }) => {
  const [statusFilter, setStatusFilter] = useState({
    filters: [
      {
        label: "All",
        count: 500,
        active: false,
      },
      {
        label: "Open",
        count: 30,
        active: true,
      },
      {
        label: "Completed",
        count: 40,
        active: false,
      },
      {
        label: "Canceled",
        count: 10,
        active: false,
      },
    ],
    active: false,
  });

  return (
    <div className="dt-filters">
      {JSON.stringify(statusFilter)}
      <div className="dt-filters__col">
        <div className="dt-filters__label">
          <img
            className="dt-filters-icon"
            src="src/images/filter-icon.svg"
            alt=""
          />
          <h2 className="text-m-bold">Filters</h2>
        </div>
        <div
          className={"dt-filters-item " + (statusFilter.active ? "active" : "")}
        >
          <div
            className="dt-filters-item-cl"
            onClick={() => {
              setStatusFilter({
                ...statusFilter,
                active: !statusFilter.active,
              });
            }}
          >
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
          <div className="dt-filters__box">
            <StatusFilters
              statusFilters={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <div className="dt-filters__box-buttons">
              <button className="btn text-m-bold">Cancel</button>
              <button className="btn btn-primary text-m-bold">Apply</button>
            </div>
          </div>
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
          <input
            placeholder="Search"
            className="dt-filters__search-input"
            type="text"
          />
        </label>
      </div>
    </div>
  );
};
