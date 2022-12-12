import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal, { closeStyle } from "simple-react-modal";
import logo from "/src/images/dumpling_logo.png";

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
    
    console.log(filter);

    setFilter(filter);
  };

  /**
   *
   * @param {string} type
   * @param {object} object
   * @returns
   */
  const applyFilter = (type, object) => {
    if (type === "status") {
      const statusFilterSet = object.filters.filter((f) => f.active === true);
      if (statusFilterSet.length > 0) {
        const statusFilterSetArray = statusFilterSet.map(({ label }) => label);
        const string = String(statusFilterSetArray);

        setSearchParams({
          ...searchParams,
          status: String(statusFilterSetArray),
        });
        navigate(0);
      } else {
        setSearchParams({
          ...searchParams,
          status: [],
        });
        navigate(0);
      }
    } else if (type === "date"){
      if( object.length > 0 ){
        setSearchParams({
          ...searchParams,
          date: String(object),
        });

      } else {
        setSearchParams({
          ...searchParams,
          date: [],
        });
        navigate(0);
      }
    }
  };

  const applySearch = (value) => {
    setSearchParams({
      ...searchParams,
      q: String(value),
    });
    navigate(0);
  };

  const goNext = () => {
    window.localStorage.setItem("Auth", nextToken);
    navigate(0);
  };

  return (
    <div className="dt-container">
      {JSON.stringify(selectedRows)}
      {/*JSON.stringify(shoppers)*/}
      <img className="" src={logo} />

      <DataListFilter
        shoppers={shoppers}
        applyFilter={applyFilter}
        search={searchTerm}
        setSearch={applySearch}
      />
      {selectedRows.selectedCount != 0 && (
        <div className="dt-assign">
          <span>{selectedRows.selectedCount} selected</span>
          <button
          onClick={() =>{
            setOpenAssignModal(!openAssignModal)
          }}
            className={
              "dt-assign__btn btn btn-primary " +
              (selectedRows.selectedCount != 0 ? "active" : "")
            }
          >
            assign
          </button>
        </div>
      )}

      <button
        onClick={() => {
          assignedAction(
            [
              {
                id: "a7d02a9e-2d49-48cb-accf-5c3d5369e30b",
                deliveryTimestamp: "1661508000",
              },
            ],
            []
          );
          setTimeout(() => {
            navigate(0);
          }, 500);
        }}
      >
        Assignar
      </button>

      <DataTable
        columns={columns}
        data={listData}
        expandableRows
        defaultSortFieldId={1}
        selectableRows
        onSelectedRowsChange={setSelectedRows}
        expandableRowsComponent={ExpandedComponent}
      />
      <Modal show={openAssignModal} onClose={()=>{setOpenAssignModal(!openAssignModal)}} transitionSpeed={1000}>
        
        <ShopperAssignModal />
      </Modal>
    </div>
  );
};
