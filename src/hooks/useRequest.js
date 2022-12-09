import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `https://bsr67l2a4jdkxci4w4dwdv7mf4.appsync-api.us-east-2.amazonaws.com/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("Auth")}`
  }
});

const useGetOrders = (filter=null, quantity=10) => {

  if(filter){
    if(filter['status'] && !filter['shopper'] && !filter['date']){
      return useQuery(["getOrders", filter['status']], async () => {
        const { filteredLinkedOrders } = await graphQLClient.request(gql`
        query getOrders($status: [String!]!, $quantityResult: Int!) {
          filteredLinkedOrders(
            count: $quantityResult,
            filters: [{operator: EQ, property: "orderStatus", values: $status}]
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
              deliveryFee
            },
            nextToken
          }
        }`, { status: filter['status'], quantityResult: quantity });
        return filteredLinkedOrders;
      });
    }
    
    if(!filter['status'] && filter['shopper'] && !filter['date']){
      return useQuery(["getOrders", filter['shopper']], async () => {
        const { filteredLinkedOrders } = await graphQLClient.request(gql`
        query getOrders($shopper: [String!]!, $quantityResult: Int!) {
          filteredLinkedOrders(
            count: $quantityResult,
            filters: [{operator: EQ, property: "shopperId", values: $shopper}]
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
              deliveryFee
            },
            nextToken
          }
        }`, { shopper: filter['shopper'], quantityResult: quantity });
        return filteredLinkedOrders;
      });
    }
    
    if(!filter['status'] && !filter['shopper'] && filter['date']){
      return useQuery(["getOrders", filter['date']], async () => {
        const { filteredLinkedOrders } = await graphQLClient.request(gql`
        query getOrders($date: String!, $quantityResult: Int!) {
          filteredLinkedOrders(
            count: $quantityResult,
            filters: [{operator: EQ, property: "deliveryDate", values: $date}]
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
              deliveryFee
            },
            nextToken
          }
        }`, { date: filter['date'], quantityResult: quantity });
        return filteredLinkedOrders;
      });
    }

    if(filter['status'] && filter['shopper'] && !filter['date']){
      return useQuery(["getOrders", filter['status']], async () => {
        const { filteredLinkedOrders } = await graphQLClient.request(gql`
        query getOrders($status: [String!]!, $shopper: [String!]!, $quantityResult: Int!) {
          filteredLinkedOrders(
            count: $quantityResult,
            filters: [
              {operator: EQ, property: "orderStatus", values: $status},
              {operator: EQ, property: "shopperId", values: $shopper}
            ]
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
              deliveryFee
            },
            nextToken
          }
        }`, { status: filter['status'], shopper: filter['shopper'], quantityResult: quantity });
        return filteredLinkedOrders;
      });
    }

    if(filter['status'] && filter['shopper'] && filter['date']){
      return useQuery(["getOrders", filter['status'], filter['date']], async () => {
        const { filteredLinkedOrders } = await graphQLClient.request(gql`
        query getOrders($status: [String!]!, $shopper: [String!]!, $date: String!, $quantityResult: Int!) {
          filteredLinkedOrders(
            count: $quantityResult,
            filters: [
              {operator: EQ, property: "orderStatus", values: $status},
              {operator: EQ, property: "shopperId", values: $shopper},
              {operator: EQ, property: "deliveryDate", values: $date},
            ]
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
              deliveryFee
            },
            nextToken
          }
        }`, { status: filter['status'], shopper: filter['shopper'], date: filter['date'], quantityResult: quantity });
        return filteredLinkedOrders;
      });
    }
  }

  return useQuery(["getOrders", quantity], async () => {
    const { filteredLinkedOrders } = await graphQLClient.request(gql`
    query getOrders($quantityResult: Int!) {
      filteredLinkedOrders(
        count: $quantityResult,
        filters: []) {
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
          deliveryFee
        },
        nextToken
      }
    }`, {quantityResult: quantity});
    return filteredLinkedOrders;
  });
};

export { useGetOrders };