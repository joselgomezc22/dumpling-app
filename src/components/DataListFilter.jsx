import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CalendarFilter from "./CalendarFilter";

/*Images importing */
import filterIcon from "/src/images/filter-icon.svg";
import filterArrow from "/src/images/filter-arrow.svg";
import searchIcon from "/src/images/search-icon.svg";

const StatusFilters = ({
  statusFilters,
  setStatusFilters,
  openFilter,
  setOpenFilter,
  applyFilter,
}) => {
  const [statusFilterHolder, setStatusFilterHolder] = useState({});
  const [copy, setCopy] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  const filterBySearchParams = (statusFilterHolder, setStatusFilterHolder) => {
    const filter = {};

    filter.status = searchParams.get("status")
      ? searchParams.get("status").split(",")
      : null;

    if (filter.status && statusFilterHolder.filters) {
      const def = statusFilterHolder.filters.filter(
        (item) => !filter.status.includes(item.label)
      );
      const news = statusFilterHolder.filters.map((f) => {
        if (filter.status.includes(f.label)) return { ...f, active: true };
        return f;
      });
      return news;
    }
  };

  useEffect(() => {
    setCopy(JSON.stringify(statusFilters));

    filterBySearchParams(statusFilterHolder, setStatusFilterHolder);
    const news = filterBySearchParams(
      statusFilterHolder,
      setStatusFilterHolder
    );
    if (news) {
      setStatusFilterHolder({ ...statusFilters, filters: news });
      return;
    } else {
      setStatusFilterHolder(statusFilters);
    }
  }, [copy]);

  return (
    <>
      <div className="dt-filters__box-items">
        {statusFilterHolder?.filters &&
          statusFilterHolder?.filters.map((filter, index) => (
            <label
              key={index}
              className={
                "dt-filters__status dt-filters__box-item " +
                (filter.active ? "active" : "")
              }
            >
              <input
                onChange={() => {
                  statusFilterHolder.filters[index].active =
                    !statusFilterHolder.filters[index].active;

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
      </div>
      <div className="dt-filters__box-buttons">
        <button
          onClick={() => {
            setOpenFilter({ ...openFilter, status: false });
            setStatusFilters(JSON.parse(copy));
          }}
          className="btn text-m-bold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            //return;
            applyFilter("status", statusFilterHolder);
            setOpenFilter({ ...openFilter, status: false });
          }}
          className="btn btn-primary text-m-bold"
        >
          Apply
        </button>
      </div>
    </>
  );
};
const ShopperFilters = ({
  shopperFilter,
  setShopperFilter,
  openFilter,
  setOpenFilter,
  applyFilter,
}) => {
  const [shopperFilterHolder, setShopperFilterHolder] = useState({});
  const [copy, setCopy] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  const filterBySearchParams = (
    shopperFilterHolder,
    setShopperFilterHolder
  ) => {
    const filter = {};

    filter.shopper = searchParams.get("shopper")
      ? searchParams.get("shopper").split(",")
      : null;

    console.log(shopperFilterHolder);
    if (filter.shopper && shopperFilterHolder.length > 0) {
      const def = shopperFilterHolder.filter(
        (item) => !filter.shopper.includes(item.id)
      );
      const news = shopperFilterHolder.map((f) => {
        if (filter.shopper.includes(f.id)) return { ...f, active: true };
        return f;
      });
      return news;
    }
  };

  useEffect(() => {
    setCopy(JSON.stringify(shopperFilter));

    filterBySearchParams(shopperFilterHolder, setShopperFilterHolder);
    const news = filterBySearchParams(
      shopperFilterHolder,
      setShopperFilterHolder
    );
    if (news) {
      setShopperFilterHolder(news);
      return;
    } else {
      setShopperFilterHolder(shopperFilter);
    }
  }, [copy]);

  return (
    <>
      <div className="dt-filters__box-items">
        {shopperFilterHolder.length > 0 &&
          shopperFilterHolder.map((filter, index) => (
            <label
              key={index}
              className={
                "dt-filters__status dt-filters__box-item " +
                (filter.active ? "active" : "")
              }
            >
              <input
                onChange={() => {
                  shopperFilterHolder[index].active =
                    !shopperFilterHolder[index].active;

                  setShopperFilterHolder([...shopperFilterHolder]);
                }}
                checked={filter.active}
                type="checkbox"
                name=""
                id=""
              />
              <span className="d-flex">
                <p className="text-m">{filter.name}</p>
                <p className="text-m">{filter.phone}</p>
              </span>
            </label>
          ))}
      </div>
      <div className="dt-filters__box-buttons">
        <button
          onClick={() => {
            setOpenFilter({ ...openFilter, shopper: false });
            setShopperFilter(JSON.parse(copy));
          }}
          className="btn text-m-bold"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            //return;
            applyFilter("shopper", shopperFilterHolder);
            setOpenFilter({ ...openFilter, shopper: false });
          }}
          className="btn btn-primary text-m-bold"
        >
          Apply
        </button>
      </div>
    </>
  );
};

export const DataListFilter = ({
  applyFilter,
  shoppers,
  search,
  setSearch,
}) => {
  const [openFilter, setOpenFilter] = useState({
    status: false,
    date: false,
    shopper: false,
  });

  const [calendarFilter, setCalendarFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState({
    filters: [
      {
        label: "Open",
        key: "Created",
        count: 30,
        active: false,
      },
      {
        label: "Complete",
        key: "Complete",
        count: 40,
        active: false,
      },
      {
        label: "Canceled",
        key: "Canceled",
        count: 10,
        active: false,
      },
    ],
    active: false,
  });
  const [shopperFilter, setShopperFilter] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setShopperFilter(
      shoppers.map((x) => {
        return { id: x.id, name: x.name, phone: x.phone, active: false };
      })
    );
  }, []);

  const [inputSearch, setInputSearch] = useState(searchParams.get("q") || '');

  const onPressSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(inputSearch);
    }
  };

  return (
    <>
      <div className="dt-filters">
        <div className="dt-filters__col">
          <div className="dt-filters__label">
            <img className="dt-filters-icon" src={filterIcon} alt="" />
            <h2 className="text-m-bold">Filters</h2>
          </div>
          <div
            className={"dt-filters-item " + (openFilter.status ? "active" : "")+(searchParams.get("status") ? " highlight":" ") }
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
            <div className="dt-filters__box status">
              {openFilter.status && (
                <StatusFilters
                  statusFilters={statusFilter}
                  setStatusFilters={setStatusFilter}
                  setOpenFilter={setOpenFilter}
                  openFilter={openFilter}
                  applyFilter={applyFilter}
                />
              )}
            </div>
          </div>
          <div
            className={"dt-filters-item " + (openFilter.date ? "active" : "")+(searchParams.get("DeliveryDate") ? " highlight":" ") }
          >
            <div
              className="dt-filters-item-cl"
              onClick={() => {
                setOpenFilter({
                  ...openFilter,
                  date: !openFilter.date,
                });
              }}
            >
              <img className="dt-filters-icon" src={filterIcon} alt="" />
              <h2 className="text-m-bold">Delivery date</h2>
              <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
            </div>
            <div className="dt-filters__box date">
              {openFilter.date && (
                <CalendarFilter
                  calendarFilter={calendarFilter}
                  setCalendarFilter={setCalendarFilter}
                  setOpenFilter={setOpenFilter}
                  openFilter={openFilter}
                  applyFilter={applyFilter}
                />
              )}
            </div>
          </div>
          <div
            className={
              "dt-filters-item " + (openFilter.shopper ? "active" : "")+(searchParams.get("shopper") ? " highlight":" ") 
            }
          >
            <div
              className="dt-filters-item-cl"
              onClick={() => {
                setOpenFilter({
                  ...openFilter,
                  shopper: !openFilter.shopper,
                });
              }}
            >
              <img className="dt-filters-icon" src={filterIcon} alt="" />
              <h2 className="text-m-bold">Assigned shopper</h2>
              <img className="dt-filters-arrow-icon" src={filterArrow} alt="" />
            </div>
            <div className="dt-filters__box shopper">
              {openFilter.shopper && (
                <ShopperFilters
                  shopperFilter={shopperFilter}
                  setShopperFilter={setShopperFilter}
                  setOpenFilter={setOpenFilter}
                  openFilter={openFilter}
                  applyFilter={applyFilter}
                />
              )}
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
              value={inputSearch}
              onChange={(e) => {
                console.log(e);
                setInputSearch(e.target.value);
              }}
              onKeyDown={onPressSearch}
            />
          </label>
        </div>
      </div>
    </>
  );
};
