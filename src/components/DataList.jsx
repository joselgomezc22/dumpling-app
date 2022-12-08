import DataTable from 'react-data-table-component';
import { useState } from 'react';

const ExpandedComponent = ({ data }) => <h3>{data.year}</h3>;


const columns = [
  {
      name: 'Title',
      selector: row => row.title,
  },
  {
      name: 'Year',
      selector: row => row.year,
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
]



export const DataList = ({orders}) => {

  const [selectedRows, setSelectedRows] = useState({})

  



  const columns = [
    {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
    },
    {
        name: 'Director',
        selector: row => row.director,
        sortable: true,
    }
];


  return (
    <>
    {JSON.stringify(selectedRows)}
    <br />
      <br />
      <DataTable
            columns={columns}
            data={data}
            expandableRows
            defaultSortFieldId={1}
            selectableRows
            onSelectedRowsChange={setSelectedRows}
            expandableRowsComponent={ExpandedComponent}
        />

    
    </>
  )
}
