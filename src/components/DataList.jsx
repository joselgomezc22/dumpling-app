import DataTable from "react-data-table-component";
<<<<<<< HEAD
import { useState , useEffect } from "react";
import logo from "/src/images/dumpling_logo.png";

import { DataListFilter } from "./DataListFilter";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data)}</pre> ;
=======
import { useState, useEffect } from "react";
import logo from "/src/images/dumpling_logo.png";

import { DataListFilter } from "./DataListFilter";
import { useSearchParams } from "react-router-dom";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data)}</pre>;
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd

const StatusBox = ({ status }) => {
  return <span className={"dt-status " + status}>{status} </span>;
};

<<<<<<< HEAD
export const DataList = ({ orders , setFilter , globalFilter , filterChange }) => {
=======
export const DataList = ({ orders, setFilter, globalFilter, filterChange }) => {
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd
  const [selectedRows, setSelectedRows] = useState({});

  const [listData, setListData] = useState(orders.orders);

  const [statusFilter, setStatusFilter] = useState({});

<<<<<<< HEAD
  useEffect(() => {
    
    //globalFilter
    //statusFilter
    /*if (globalFilter.status) {
      console.log(globalFilter.status);
      globalFilter.status.map(f=>{
        if(statusFilter.filters){
          const index = statusFilter.filters.map(object => object.label).indexOf(f);
          statusFilter.filters[index].active = true;
        }
      })
      setStatusFilter({...statusFilter})
    }*/


  }, [globalFilter])
  

=======
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {}, [globalFilter]);
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd

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
      selector: (row) => row.shopperId,
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

  const applyStatusFilter = () => {
<<<<<<< HEAD
    const statusFilterSet = statusFilter.filters.filter(f=>f.active === true);
    console.log(statusFilterSet)
    if (statusFilterSet.length > 0) {
      const statusFilterSetArray = statusFilterSet.map(({ label }) => label);
      setFilter({
        status: statusFilterSetArray,
        shopper: null, 
        date: null,
      })
    } else {
      setFilter(null)
    }
    filterChange();
  }
=======
    const statusFilterSet = statusFilter.filters.filter(
      (f) => f.active === true
    );
    if (statusFilterSet.length > 0) {
      const statusFilterSetArray = statusFilterSet.map(({ label }) => label);
      setSearchParams({
        ...searchParams,
        status: String(statusFilterSetArray),
      });
      setFilter({
        status: statusFilterSetArray,
        shopper: null,
        date: null,
      });
    } else {
      setFilter(null);
    }
    filterChange();
  };
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd

  return (
    <div className="dt-container">
      <img className="" src={logo} />

<<<<<<< HEAD
      <DataListFilter setFilter={setStatusFilter} applyStatusFilter={applyStatusFilter} />
=======
      <DataListFilter
        setFilter={setStatusFilter}
        applyStatusFilter={applyStatusFilter}
      />
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd
      <DataTable
        columns={columns}
        data={listData}
        expandableRows
        defaultSortFieldId={1}
        selectableRows
        onSelectedRowsChange={setSelectedRows}
        expandableRowsComponent={ExpandedComponent}
      />
<<<<<<< HEAD
     
=======
>>>>>>> 4f92c664d2ddce06f066e7c8e7fc00fde91ad9fd
    </div>
  );
};
