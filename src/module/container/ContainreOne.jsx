import UseGet from "crud/useGet";
import React from "react";
import { get } from "lodash";

const ContainreOne = ({
  url,
  queryKeyName,
  params,
  onSuccess,
  onError,
  children,
}) => {
  const data = UseGet({
    url,
    queryKeyName,
    params,
    onSuccess,
    onError,
  });
  console.log(data);
  return children({
    items: get(data, "data.data.data"),
  });
};

export default ContainreOne;
