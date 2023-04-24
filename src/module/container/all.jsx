import UseGet from "crud/useGet";
import React from "react";
import { get } from "lodash";

const all = ({ url, params, queryKeyName, onSuccess, onError, children }) => {
  const data = UseGet({
    url,
    params,
    queryKeyName,
    onSuccess,
    onError,
  });
  console.log(get(data, "data"));
  return children({
    items: get(data, "data.data.data"),
    meta: {
      total: get(data, "data.data.total"),
      perPage: get(data, "data.data.per_page"),
      current: get(data, "data.data.current_page"),
      last: get(data, "data.data.last_page"),
    },
    ...data,
  });
};

export default all;
