import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/*Images importing */
import filterIcon from "/src/images/filter-icon.svg";
import filterArrow from "/src/images/filter-arrow.svg";
import searchIcon from "/src/images/search-icon.svg";

const StatusFilters = ({ statusFilters, setStatusFilters }) => {
  return (
    <>
      {statusFilters.filters.map((filter, index) => (
        <label key={index} className="dt-filters__status">
          <input
            onChange={() => {
              statusFilters.filters[index].active =
                !statusFilters.filters[index].active;
              setStatusFilters({ ...statusFilters });
            }}
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

export const DataListFilter = ({ setFilter, applyStatusFilter }) => {
  const [statusFilter, setStatusFilter] = useState({
    filters: [
      {
        label: "All",
        count: 500,
        active: false,
      },
      {
        label: "Created",
        count: 30,
        active: false,
      },
      {
        label: "Complete",
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

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilter(statusFilter);
    
  }, [statusFilter]);

  return (
    <>
      <div className="dt-filters">
        <div className="dt-filters__col">
          <div className="dt-filters__label">
            <img className="dt-filters-icon" src={filterIcon} alt="" />
            <h2 className="text-m-bold">Filters</h2>
          </div>
          <div
            className={
              "dt-filters-item " + (statusFilter.active ? "active" : "")
            }
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
              <img className="dt-filters-icon" src={filterIcon} alt="" />
              <h2 className="text-m-bold">Order status</h2>
              <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
            </div>
            <div className="dt-filters__box">
              <StatusFilters
                statusFilters={statusFilter}
                setStatusFilters={setStatusFilter}
              />

              <div className="dt-filters__box-buttons">
                <button
                  onClick={() => {
                    setStatusFilter({
                      ...statusFilter,
                      active: !statusFilter.active,
                    });
                  }}
                  className="btn text-m-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    applyStatusFilter();
                    setStatusFilter({
                      ...statusFilter,
                      active: !statusFilter.active,
                    });
                  }}
                  className="btn btn-primary text-m-bold"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="dt-filters-item">
            <img className="dt-filters-icon" src={filterIcon} alt="" />
            <h2 className="text-m-bold">Delivery date</h2>
            <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
          </div>
          <div className="dt-filters-item">
            <img className="dt-filters-icon" src={filterIcon} alt="" />
            <h2 className="text-m-bold">Assigned shopper</h2>
            <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
          </div>
        </div>
        <div className="dt-filters__col">
          <label className="dt-filters__search">
            <img className="dt-filters-search-icon" src={searchIcon} alt="" />
            <input
              placeholder="Search"
              className="dt-filters__search-input"
              type="text"
            />
          </label>
        </div>
      </div>
    </>
  );
};





/*

  import { Card, Page, Layout, TextContainer, Heading , List , Button } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function GottenPlan() {

  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("charge_id");

  return (
    <Page>
      <Heading >
      Congrats, you got your plan {param}
      </Heading>

      <Button onClick={()=>{}}></Button>
      
    </Page>
  );
}

 */
