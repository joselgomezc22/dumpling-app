import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../context/DataContext';
import { DataList } from '../components/DataList'
import { useGetOrders } from '../hooks/useRequest';

const List = () => {

  const { data, error, isLoading, isSuccess } = useGetOrders(null, 10);
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
