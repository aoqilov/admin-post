import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import api from "services/api";
import queryBuilder from "services/querybuilder";

const UseGet = ({
  url,
  queryKeyName,
  params,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const data = useQuery({
    queryKey: [queryKeyName, params],
    queryFn: async () => {
      return await api.get(queryBuilder(url, params));
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (data) => onError(data),
  });
  return { ...data };
};

export default UseGet;
