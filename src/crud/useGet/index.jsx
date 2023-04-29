import { useQuery } from "@tanstack/react-query";
import api from "services/api";
import queryBuilder from "services/querybuilder";

const UseGet = ({
  url,
  params,
  queryKey,
  method = "get",
  onSuccess = () => {},
  onError = () => {},
}) => {
  const data = useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      return await api[method](queryBuilder(url, params));
    },
    onSuccess: (data) => onSuccess(data),
    onError: (error) => onError(error),
  });
  return { ...data };
};

export default UseGet;
