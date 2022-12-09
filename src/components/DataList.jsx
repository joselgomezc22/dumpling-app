import DataTable from "react-data-table-component";
import { useState , useEffect } from "react";
import logo from "/src/images/dumpling_logo.png";

import { DataListFilter } from "./DataListFilter";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data)}</pre> ;

const StatusBox = ({ status }) => {
  return <span className={"dt-status " + status}>{status} </span>;
};

export const DataList = ({ orders , setFilter , globalFilter , filterChange }) => {
  const [selectedRows, setSelectedRows] = useState({});

  const [listData, setListData] = useState(orders.orders);

  const [statusFilter, setStatusFilter] = useState({});

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

  return (
    <div className="dt-container">
      <img className="" src={logo} />

      <DataListFilter setFilter={setStatusFilter} applyStatusFilter={applyStatusFilter} />
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
