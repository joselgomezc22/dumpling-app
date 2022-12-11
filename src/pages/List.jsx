import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../context/DataContext';
import { DataList } from '../components/DataList'
import { useGetOrders, useExecuteQuery } from '../hooks/useRequest';
import { gql, useQuery } from "@apollo/client";

import { apolloClient } from '../hooks/useRequest';

const List = () => {

  const [filter, setFilter] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const filterChange = async () => {
  }
  
  /**obtener ordenes */

  const GET_ORDERS = gql`
    query getOrders($filter: [QueryFilterInput!]!, $term: String!) {
      getBossBuddies {
        bossBuddyProfiles {
            id,
            name,
            permissionLevel,
            phone
        }
      }
      filteredLinkedOrders(
        count: 10,
        filters: $filter,
        text: $term,
        sort: null
      ) {
        orders {
          version,
          id,
          clientId,
          shopperId,
          firstName,
          lastName,
          phone,
          email,
          clientImage,
          note,
          orderStatus,
          orderDateTime,
          orderTimestamp,
          deliveryDate,
          deliveryTime,
          deliveryTimestamp,
          deliveryStartDateTime,
          deliveryEndDateTime,
          feeAndPreGratuityDisplay,
          deliveryFee,
          assignedTo
        },
      nextToken
    }
  }
`;

  const queryFilter = [];

  if(filter['status']?.length){
    queryFilter.push(
      {
        property: "orderStatus", operator: "ANY", values: filter['status']
      }
    );
  }
  
  if(filter['shopper']?.length){
    queryFilter.push(
      {
        property: "assignedTo", operator: "ANY", values: filter['shopper']
      }
    );
  }

  const {error, loading, data} = useQuery(GET_ORDERS, {
    variables: {
      filter: queryFilter,
      term: searchTerm
    }
  });

  if(error) {
    return (
      <>
        <h1>{ error }</h1>
      </>
    );
  } 
  
  if(loading) {
    return (
      <>
        <h1>Loading data</h1>
      </>
    );
  } 

  return (
    <>
      <pre>
        {JSON.stringify(filter)}
      </pre>
      <DataList
        orders={data.filteredLinkedOrders}
        shoppers={data.getBossBuddies.bossBuddyProfiles}
        globalFilter={[]}
        setFilter={setFilter}
        filterChange={filterChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} />
    </>
  );
};

/*const List = () => {

  const [filter, setFilter] = useState(null)


  
  const { data, error, isLoading, isSuccess } = useGetOrders(filter, 10);
  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  
  const filterChange = async () => {
    const { data, error, isLoading, isSuccess } = useGetOrders(filter, 10);
    if (error) return <h1>Something went wrong!</h1>;
    if (isLoading) return <h1>Loading...</h1>;
  }

  return (
    isSuccess && (
      <article className="Post">
        <pre>
          Filter : {JSON.stringify(filter)}
        </pre>
        
        <DataList orders={data} globalFilter={filter} setFilter={setFilter} filterChange={filterChange}  />
      </article>
    ) 
  ); 
}*/

export default List;
