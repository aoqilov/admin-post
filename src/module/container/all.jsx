import { useGet } from "crud/useGet";
import { get } from "lodash";
import React from "react";

const all = ({ url, queryKey, params, onSuccess, onError, children }) => {
  const data = useGet({ url, queryKey, params, onSuccess, onError });
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
