import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal, { closeStyle } from "simple-react-modal";
import logo from "/src/images/dumpling_dashboard_logo.png";
import userIcon from "/src/images/user-icon.svg";

import { DataListFilter } from "./DataListFilter";
import ShopperAssignModal from "./ShopperAssignModal";

import { useSearchParams, useNavigate } from "react-router-dom";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data)}</pre>;

const StatusBox = ({ status }) => {
  return <span className={"dt-status " + status}>{status} </span>;
};

const renderShopper = (buddies, assinedTo) => {
  return (
    assinedTo?.map((item) => {
      const data = buddies?.find((ele) => ele.id === item);
      return <p key={item}>{data.name}</p>;
    }) || "N/A"
  );
};

export const DataList = ({
  orders,
  nextToken,
  nextPage,
  setFilter,
  globalFilter,
  filterChange,
  shoppers,
  searchTerm,
  setSearchTerm,
  assignedAction,
}) => {
  const [selectedRows, setSelectedRows] = useState({});

  const [listData, setListData] = useState(orders.orders);

  const [statusFilter, setStatusFilter] = useState({});
  const [openAssignModal, setOpenAssignModal] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    filterBySearchParams();
  }, []);

  const columns = [
    {
      name: "Customer",
      selector: (row) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Order status",
      selector: (row) => <StatusBox status={row.orderStatus} />,
      sortable: true,
    },
    {
      name: "Delivery date",
      selector: (row) => row.deliveryDate,
      sortable: true,
    },
    {
      name: "Delivery time",
      selector: (row) => row.deliveryTime,
      sortable: true,
    },
    {
      name: "Assigned shopper (id)",
      selector: (row) => renderShopper(shoppers, row.assignedTo),
      sortable: true,
    },
    {
      name: "Delivery Address ", //null
      selector: (row) => "",
      sortable: true,
    },
    {
      name: "Gratuity", //null
      selector: (row) => "",
      sortable: true,
    },
  ];

  const navigate = useNavigate();
  const filterBySearchParams = () => {
    const filter = {};
    const termSearch = searchParams.get("q")
      ? searchParams.get("q")
      : searchTerm;

    setSearchTerm(termSearch);

    filter.status = searchParams.get("status")
      ? searchParams.get("status").split(",")
      : null;
    filter.shopper = searchParams.get("shopper")
      ? searchParams.get("shopper").split(",")
      : null;
    filter.date = searchParams.get("date")
      ? searchParams.get("date").split(",")
      : null;

    setFilter(filter);
  };

  /**
   *
   * @param {string} type
   * @param {object} object
   * @returns
   */
  const applyFilter = (type, object) => {
    switch (type) {
      case "status":
        const statusFilterSet = object.filters.filter((f) => f.active === true);
        if (statusFilterSet.length > 0) {
          const statusFilterSetArray = statusFilterSet.map(
            ({ label }) => label
          );
          const string = String(statusFilterSetArray);
          let urlParamsCopy = {};
          searchParams.forEach((value, key) => {
            urlParamsCopy[key] = value;
          });
          setSearchParams({
            ...urlParamsCopy,
            status: String(statusFilterSetArray),
          });
          navigate(0);
        } else {
          let urlParamsCopy = {};
          searchParams.forEach((value, key) => {
            urlParamsCopy[key] = value;
          });
          setSearchParams({
            ...urlParamsCopy,
            status: [],
          });
          navigate(0);
        }
      case "shopper":
        const shopperFilterSet = object.filter((f) => f.active === true);
        if (shopperFilterSet.length > 0) {
          const shopperFilterSetArray = shopperFilterSet.map(({ id }) => id);
          const string = String(shopperFilterSetArray);
          let urlParamsCopy = {};
          searchParams.forEach((value, key) => {
            urlParamsCopy[key] = value;
          });
          setSearchParams({
            ...urlParamsCopy,
            shopper: String(shopperFilterSetArray),
          });
          navigate(0);
        } else {
          let urlParamsCopy = {};
          searchParams.forEach((value, key) => {
            urlParamsCopy[key] = value;
          });
          setSearchParams({
            ...urlParamsCopy,
            shopper: [],
          });
          navigate(0);
        }
        break;
      case "date":
        const dateFilterSet = object;
        console.log(dateFilterSet);
        //return;
        if (object.length > 0) {
          const string = String(dateFilterSet);
          console.log(string);
          let urlParamsCopy = {};
          searchParams.forEach((value, key) => {
            urlParamsCopy[key] = value;
          });
          setSearchParams({
            ...urlParamsCopy,
            date: String(dateFilterSet),
          });
          navigate(0);
        } else {
          let urlParamsCopy = {};
          searchParams.forEach((value, key) => {
            urlParamsCopy[key] = value;
          });
          setSearchParams({
            ...urlParamsCopy,
            date: [],
          });
          navigate(0);
        }
        break;

      default:
        break;
    }
  };

  const applySearch = (value) => {
    setSearchParams({
      status: searchParams.getAll("status"),
      shopper: searchParams.getAll("shopper"),
      date: searchParams.getAll("date"),
      q: String(value),
    });
    navigate(0);
  };

  const goNext = () => {
    window.localStorage.setItem("Auth", nextToken);
    navigate(0);
  };

  const setShopperToOrder = (shoppers) => {
    assignedAction(
      selectedRows.selectedRows.map((x) => {
        return { id: x.id, deliveryTimestamp: x.deliveryTimestamp };
      }),
      shoppers
    );
    setTimeout(() => {
      navigate(0);
    }, 500);
  };

  return (
    <div className="dt-overlay">
      
      <img onClick={()=>{setSearchParams({});navigate(0)}} className="dt-logo" src={logo} />
      <div className="dt-container">
        <DataListFilter
          shoppers={shoppers}
          applyFilter={applyFilter}
          search={searchTerm}
          setSearch={applySearch}
        />
        <div
          className={
            "dt-assign " + (selectedRows.selectedCount != 0 ? "active" : "")
          }
        >
          {selectedRows.selectedCount != 0 && (
            <>
              <span className="text-m-bold">
                {selectedRows.selectedCount} selected
              </span>
              <button
                onClick={() => {
                  setOpenAssignModal(!openAssignModal);
                }}
                className={
                  "dt-assign__btn btn btn-primary " +
                  (selectedRows.selectedCount != 0 ? "active" : "")
                }
              >
                <img src={userIcon} alt="user icon" /> Assign orders to shopper
              </button>
            </>
          )}
        </div>

        <DataTable
          columns={columns}
          data={listData}
          defaultSortFieldId={1}
          selectableRows
          onSelectedRowsChange={setSelectedRows}
        />
        <Modal
          show={openAssignModal}
          onClose={() => {
            setOpenAssignModal(!openAssignModal);
          }}
          transitionSpeed
        >
          <ShopperAssignModal
            setShopperToOrder={setShopperToOrder}
            shoppers={shoppers}
            setOpenAssignModal={setOpenAssignModal}
          />
        </Modal>
      </div>
    </div>
  );
};
