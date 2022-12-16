import React, { useEffect, useContext, useState } from "react";
import { DataList } from "../components/DataList";
import { gql, useQuery, useMutation } from "@apollo/client";
import { apolloClient } from "../hooks/useRequest";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const List = () => {
  const MySwal = withReactContent(Swal);

  let [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    status: searchParams.get("status")
      ? searchParams.get("status").split(",")
      : null,
    shopper: searchParams.get("shopper")
      ? searchParams.get("shopper").split(",")
      : null,
    date: searchParams.get("DeliveryDate")
      ? searchParams.get("DeliveryDate").split(",")
      : null,
    sort: searchParams.get("sort") ? searchParams.get("sort") : null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    property: searchParams.get("sort")
      ? searchParams.get("sort").split(":")[0]
      : "id",
    direction: searchParams.get("sort")
      ? searchParams.get("sort").split(":")[1].replace(" ", "")
      : "DESC",
  });

  const [nextToken, setNextToken] = useState({
    value: localStorage.getItem("nextToken")
      ? localStorage.getItem("nextToken")
      : "",
  });

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
    filter.date = searchParams.get("DeliveryDate")
      ? searchParams.get("DeliveryDate").split(",")
      : null;
    filter.sort = searchParams.get("sort") ? searchParams.get("sort") : null;

    setFilter(filter);
  };

  useEffect(() => {
    //filterBySearchParams()
  }, []);

  const navigate = useNavigate();

  const filterChange = async () => {};

  const nextPage = (token) => {
    window.localStorage.setItem("Auth", token);
    window.location.reload();
  };

  const nextTokenSet = (value) => {
    localStorage.setItem("nextToken", value);
    setTimeout(() => {
      navigate(0);
    }, 500);
  };

  /**obtener ordenes */

  const handleSort = (column, sortDirection) => {
    if (column.sortField) {
      let urlParamsCopy = {};
      searchParams.forEach((value, key) => {
        urlParamsCopy[key] = value;
      });

      if (searchParams.get("sort")) {
        let urlParams = searchParams.get("sort").split(":");
        let key = urlParams[0];
        let value = urlParams[1];
        if (
          key == column.sortField &&
          sortDirection == "asc" &&
          value == "ASC"
        ) {
          let str = column.sortField + ": DESC";
          setSearchParams({
            ...urlParamsCopy,
            sort: str,
          });
          setSort({
            property: column.sortField,
            direction: "DESC",
          });
          navigate(0);
          return;
        }
      }
      setSearchParams({
        ...urlParamsCopy,
        sort: column.sortField + ":" + sortDirection.toUpperCase(),
      });

      setSort({
        property: column.sortField,
        direction: sortDirection.toUpperCase(),
      });
      navigate(0);

      //navigate(0);
    }
  };

  const GET_ORDERS = gql`
    query getOrders(
      $filter: [QueryFilterInput!]!
      $term: String!
      $sort: QuerySortInput!
      $nextToken: String!
    ) {
      getBossBuddies {
        bossBuddyProfiles {
          id
          name
          permissionLevel
          phone
        }
      }
      filteredLinkedOrders(
        count: 20
        filters: $filter
        text: $term
        sort: $sort
        nextToken: $nextToken
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
          deliveryAddress {
            addressLine1
            addressLine2
            city
            state
            zipcode
            country
          }
          pricingModel {
            preTipPm {
                  chosenPercent
                  chosenFixedGratuity
            }
        }
        }

        nextToken
        prevToken
        pageNumber
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
      sort: sort,
      nextToken: nextToken["value"],
    },
  });

  if (error) {
    console.log("error", { error });

    MySwal.fire({
      title: "",
      text: error,
      confirmButtonColor: "#00A651",
      icon: "error",
    }).then(function (result) {
      if (true) {
        navigate("/");
      }
    });
    return <></>;
  }
  let sw = MySwal.mixin({
    title: "Loading!",
    showSpinner: true,
    showConfirmButton: false,
  });
  if (loading) {
    sw.fire();
    sw.showLoading();
    if (!loading) {
    }
    return <></>;
  } else {
    sw.close();
  }

  if (data.filteredLinkedOrders.orders.length > 20) {
    MySwal.fire({
      title: "Acces Expired",
      text: "Login again",
      confirmButtonColor: "#00A651",
      icon: "error",
    }).then(function (result) {
      if (true) {
        navigate("/");
      }
    });
    return <></>;
  }

  return (
    <>
      <DataList
        orders={data.filteredLinkedOrders}
        shoppers={data.getBossBuddies.bossBuddyProfiles}
        globalFilter={[]}
        setFilter={setFilter}
        filter={filter}
        filterChange={filterChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        assignedAction={assignedShoppers}
        handleSort={handleSort}
        nextPage={nextTokenSet}
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
