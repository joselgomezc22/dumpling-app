import DataTable from "react-data-table-component";
import { useState } from "react";
import logo from "../images/dumpling_logo.png";

import { DataListFilter } from "./DataListFilter";

const ExpandedComponent = ({ data }) => <h3>{data.year}</h3>;

const StatusBox = ({ status }) => {
  return <span className={"dt-status " + status}>{status} </span>;
};

export const DataList = ({ orders }) => {
  const [selectedRows, setSelectedRows] = useState({});

  const [listData, setListData] = useState(orders.orders);

  const [statusFilter, setStatusFilter] = useState({});

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
    alert("Status filter applied");
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
      {JSON.stringify(statusFilter)}
    </div>
  );
};
