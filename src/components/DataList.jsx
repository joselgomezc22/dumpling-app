import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import logo from "/src/images/dumpling_logo.png";

import { DataListFilter } from "./DataListFilter";
import { useSearchParams , useNavigate  } from "react-router-dom";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data)}</pre>;

const StatusBox = ({ status }) => {
  return <span className={"dt-status " + status}>{status} </span>;
};

const renderShopper = (buddies, assinedTo) => {
  return assinedTo?.map( (item) => {
    const data = buddies?.find((ele) => ele.id === item);
    return (
      <p key={item}>{ data.name }</p>
    );
  } ) || "N/A";
};

export const DataList = ({ orders, setFilter, globalFilter, filterChange, shoppers }) => {
  const [selectedRows, setSelectedRows] = useState({});

  const [listData, setListData] = useState(orders.orders);

  const [statusFilter, setStatusFilter] = useState({});

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



      filter.status = searchParams.get("status")? searchParams.get("status").split(",") : null ;
      filter.shopper = searchParams.get("shopper")? searchParams.get("shopper").split(",") : null ;
      filter.date = searchParams.get("date")? searchParams.get("date").split(",") : null ;
      console.log(JSON.stringify(filter));
      setFilter(filter);

    
  };

  /**
   * 
   * @param {string} type 
   * @param {object} object 
   * @returns 
   */
  const applyFilter = (type,object) => {
    if(type === "status") {
      const statusFilterSet = object.filters.filter(
        (f) => f.active === true
      );
      if (statusFilterSet.length > 0) {
        const statusFilterSetArray = statusFilterSet.map(({ label }) => label);
        const string = String(statusFilterSetArray);
       
        setSearchParams({
          ...searchParams,
          status: String(statusFilterSetArray),
        });
        navigate(0);
      } else {
      }
    }
    
    
    
  };

  return (
    <div className="dt-container">
      <img className="" src={logo} />

      <DataListFilter shoppers={shoppers} applyFilter={applyFilter} />
      
      <DataTable
        columns={columns}
        data={listData}
        expandableRows
        defaultSortFieldId={1}
        selectableRows
        onSelectedRowsChange={setSelectedRows}
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};
