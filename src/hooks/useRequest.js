import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `https://bsr67l2a4jdkxci4w4dwdv7mf4.appsync-api.us-east-2.amazonaws.com/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("Auth")}`
  }
});

const useGetOrders = () => {

  return useQuery("getOrders", async () => {
    const { filteredLinkedOrders } = await graphQLClient.request(gql`
      query getOrders {
        filteredLinkedOrders(count: 5, filters: []) {
          orders {
            firstName,
            deliveryDate,
            deliveryTime,
            deliveryTimestamp
          },
        nextToken
      }
    }`);
    return filteredLinkedOrders;
  });
};

export { useGetOrders };