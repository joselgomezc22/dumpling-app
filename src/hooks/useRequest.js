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
    const { statusOrder, date, shopper } = filter;
    return useQuery(["getOrders", statusOrder, shopper], async () => {
      const { filteredLinkedOrders } = await graphQLClient.request(gql`
      query getOrders($statusOrder: [String!], $shopperId: String!, $quantityResult: Int!) {
        filteredLinkedOrders(
          count: $quantityResult,
          filters: [
            {operator: EQ, property: "orderStatus", values: $statusOrder}
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
      }`, { statusOrder: ["Complete"], quantityResult: quantity });
      return filteredLinkedOrders;
    });
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