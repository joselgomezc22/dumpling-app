import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../context/DataContext';
import { DataList } from '../components/DataList'
import { useGetOrders } from '../hooks/useRequest';
import { gql } from "graphql-request";

const List = () => {

  const filter = {
    status: ["Complete"],
    shopper: null,
    date: null,
  };

  const { data, error, isLoading, isSuccess } = useGetOrders(filter, 10);
  if (error) return <h1>Something went wrong!</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    isSuccess && (
      <article className="Post">
        <pre>{JSON.stringify(data, null, "\t")}</pre>
        <DataList orders={data} />
      </article>
    )
  );
}

export default List;
