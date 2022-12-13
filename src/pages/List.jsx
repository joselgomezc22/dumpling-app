import React, { useEffect, useContext, useState } from "react";
import { DataList } from "../components/DataList";
import { gql, useQuery, useMutation } from "@apollo/client";
import { apolloClient } from "../hooks/useRequest";
import { Link, useNavigate } from "react-router-dom";

const List = () => {
  const [filter, setFilter] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const filterChange = async () => {};

  const nextPage = (token) => {
    window.localStorage.setItem("Auth", token);
    window.location.reload();
  };

  /**obtener ordenes */

  const handleSort = (column, sortDirection) => {
    console.log(column.name+' '+ sortDirection)
  };


  const GET_ORDERS = gql`
    query getOrders($filter: [QueryFilterInput!]!, $term: String!) {
      getBossBuddies {
        bossBuddyProfiles {
          id
          name
          permissionLevel
          phone
        }
      }
      filteredLinkedOrders(
        count: 10
        filters: $filter
        text: $term
        sort: null
      ) {
        orders {
          version
          id
          clientId
          shopperId
          firstName
          lastName
          phone
          email
          clientImage
          note
          orderStatus
          orderDateTime
          orderTimestamp
          deliveryDate
          deliveryTime
          deliveryTimestamp
          deliveryStartDateTime
          deliveryEndDateTime
          feeAndPreGratuityDisplay
          deliveryFee
          assignedTo
        }
        nextToken
      }
    }
  `;

  const ASSIGNET_SHOPPERS = gql`
    mutation ($shoppers: [ID!]!, $orders: [LinkedOrderIdentifiersInput!]!) {
      assignLinkedOrdersTo(
        input: { buddyIds: $shoppers, linkedOrderIdentifiers: $orders }
      ) {
        orders {
          version
          id
          clientId
          shopperId
          firstName
          lastName
          phone
          email
          clientImage
          note
          orderStatus
          orderDateTime
          orderTimestamp
          deliveryDate
          deliveryTime
          deliveryTimestamp
          deliveryStartDateTime
          deliveryEndDateTime
          feeAndPreGratuityDisplay
          deliveryFee
          assignedTo
        }
        nextToken
      }
    }
  `;

  const [
    updateShoppers,
    {
      data: dataMutation,
      loading: loadingMutation,
      error: errorMutation,
      reset,
    },
  ] = useMutation(ASSIGNET_SHOPPERS);

  const assignedShoppers = (orders, shoppers) => {
    if (orders.length < 1) {
      return alert("Please select at least one order");
    }

    updateShoppers({
      variables: {
        orders: orders,
        shoppers: shoppers,
      },
    });
  };

  const queryFilter = [];

  if (filter["status"]?.length) {
    let statusArray = filter["status"];
    let flag = statusArray.includes("Open");
    if (flag) {
      statusArray[statusArray.indexOf("Open")] = "Created";
    }
    queryFilter.push({
      property: "orderStatus",
      operator: "ANY",
      values: statusArray,
    });
  }
  if (filter["shopper"]?.length) {
    queryFilter.push({
      property: "assignedTo",
      operator: "ANY",
      values: filter["shopper"],
    });
  }

  if (filter["date"]?.length) {
    filter["date"]?.map((date, index) => {
      const operator = index === 0 ? "GTE" : "LTE";
      queryFilter.push({
        property: "deliveryTimestamp",
        operator: operator,
        values: [date],
      });
    });
  }

  const { error, data, loading } = useQuery(GET_ORDERS, {
    variables: {
      filter: queryFilter,
      term: searchTerm,
    },
  });

  if (error) {
    console.log("error", { error });
    return (
      <>
        <h1 className="text-center">{error.message}</h1>
        <Link to="/">Go to back</Link>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <h1>Loading data</h1>
      </>
    );
  }

  if (data.filteredLinkedOrders.orders.length > 10) {
    return (
      <>
        <h1 className="text-center">Error on server</h1>
        <Link to="/">Go to back</Link>
      </>
    );
  }

  return (
    <>
      {JSON.stringify(filter)}

      <DataList
        orders={data.filteredLinkedOrders}
        shoppers={data.getBossBuddies.bossBuddyProfiles}
        globalFilter={[]}
        setFilter={setFilter}
        filterChange={filterChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        assignedAction={assignedShoppers}
        handleSort={handleSort}
      />
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
