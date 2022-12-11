import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/*Images importing */
import filterIcon from "/src/images/filter-icon.svg";
import filterArrow from "/src/images/filter-arrow.svg";
import searchIcon from "/src/images/search-icon.svg";

const StatusFilters = ({ statusFilters, setStatusFilters , openFilter , setOpenFilter , applyFilter }) => {
  const [statusFilterHolder, setStatusFilterHolder] = useState({});
  const [copy, setCopy] = useState(""); 
  
  useEffect(() => {
    setStatusFilterHolder(statusFilters);
    setCopy(JSON.stringify(statusFilters))
  }, [])

  

  return (
    <>
      {statusFilterHolder?.filters && statusFilterHolder?.filters.map((filter, index) => (
        <label key={index} className="dt-filters__status">
          <input
            onChange={() => {


              statusFilterHolder.filters[index].active = !statusFilterHolder.filters[index].active
              
              setStatusFilterHolder({ ...statusFilterHolder });
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
      <div className="dt-filters__box-buttons">
        <button
          onClick={() => {
            setOpenFilter({...openFilter,status:false})
            setStatusFilters(JSON.parse(copy))
          }}
          className="btn text-m-bold"
        >
          Cancel
        </button>
        <button
          onClick={() => {            
            setStatusFilters({
              ...statusFilterHolder,
              open: false,
            });
            applyFilter('status',statusFilters);
            setOpenFilter({...openFilter,status:false})
          }}
          className="btn btn-primary text-m-bold"
        >
          Apply
        </button>
      </div>
    </>
  );
};

const ShopperFilters = ({ shopperFilter, setShopperFilters }) => {
  return (
    <>
      {shopperFilter.filters.map((filter, index) => (
        <label key={index} className="dt-filters__status">
          <input
            onChange={(e) => {
              shopperFilter.filters[index].active = e.target.checked;
              setShopperFilters({ ...shopperFilter });
            }}
            checked={filter.active}
            type="checkbox"
            name=""
            id=""
          />
          <div className="d-flex justify-content-space-between w-100">
            <p className="text-m">{filter.label}</p>
            <p className="text-m">{filter.phone}</p>
          </div>
        </label>
      ))}
    </>
  );
};

export const DataListFilter = ({ applyFilter, shoppers }) => {
  const [openFilter, setOpenFilter] = useState({
    status:false,
    date:false,
    shopper:false,
  })

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
  const [shopperFilter, setShopperFilter] = useState({
    filters: [
      {
        label: "Rj Puma",
        phone: "914-648-8855",
      },
      {
        label: "Kelley Mauro",
        phone: "407-325-2156",
      },
      {
        label: "Jordyn Simpson",
        phone: "720-298-1657",
      },
      {
        label: "Hayley Moss",
        phone: "336-380-6940",
      },
    ],
    open: false,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    // setStatusFilterHolder(statusFilter);
  }, [statusFilter, shopperFilter]);

  return (
    <>
    <pre>
      StatusFilter:{JSON.stringify(statusFilter)}
    </pre>
      <div className="dt-filters">
        <div className="dt-filters__col">
          <div className="dt-filters__label">
            <img className="dt-filters-icon" src={filterIcon} alt="" />
            <h2 className="text-m-bold">Filters</h2>
          </div>
          <div
            className={"dt-filters-item " + (openFilter.status ? "active" : "")}
          >
            <div
              className="dt-filters-item-cl"
              onClick={() => {
                setOpenFilter({
                  ...openFilter,
                  status: !openFilter.status,
                });
              }}
            >
              <img className="dt-filters-icon" src={filterIcon} alt="" />
              <h2 className="text-m-bold">Order status</h2>
              <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
            </div>
            <div className="dt-filters__box">
              {openFilter.status && <StatusFilters
                statusFilters={statusFilter}
                setStatusFilters={setStatusFilter}
                setOpenFilter={setOpenFilter}
                openFilter={openFilter}
                applyFilter={applyFilter}
              />}
            </div>
          </div>
          <div
            className={"dt-filters-item " + (statusFilter.open ? "active" : "")}
          >
            <img className="dt-filters-icon" src={filterIcon} alt="" />
            <h2 className="text-m-bold">Delivery date</h2>
            <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
          </div>
          <div
            className={
              "dt-filters-item " + (shopperFilter.open ? "active" : "")
            }
          >
            <div
              className="dt-filters-item-cl"
              onClick={() => {
                setShopperFilter({
                  ...shopperFilter,
                  open: !shopperFilter.open,
                });
              }}
            >
              <img className="dt-filters-icon" src={filterIcon} alt="" />
              <h2 className="text-m-bold">Assigned shopper</h2>
              <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
            </div>
            <div className="dt-filters__box">
              <ShopperFilters
                shopperFilter={shopperFilter}
                setShopperFilters={setShopperFilter}
              />

              <div className="dt-filters__box-buttons">
                <button
                  onClick={() => {
                    setShopperFilter({
                      ...shopperFilter,
                      open: !shopperFilter.open,
                    });
                  }}
                  className="btn text-m-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    applyStatusFilter();
                    setShopperFilter({
                      ...shopperFilter,
                      open: !shopperFilter.open,
                    });
                  }}
                  className="btn btn-primary text-m-bold"
                >
                  Apply
                </button>
              </div>
            </div>
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
