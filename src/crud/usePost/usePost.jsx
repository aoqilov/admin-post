import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "services/api";
import queryBuilder from "services/querybuilder";
import { get } from "lodash";

const usePost = ({
  url,
  queryKeyName,
  params,
  method,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const queryClient = useQueryClient();

  const mainMutate = useMutation({
    mutationKey: queryKeyName,
    mutationFn: async ({ values, resetForm }) => {
      return await api[method](queryBuilder(url, params), values);
    },
    onSuccess: (data) => {
      onSuccess(data);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: queryKeyName });
    },
    onError: (error) => {
      onError(error);
      message.error(error.message);
      queryClient.invalidateQueries({ queryKey: queryKeyName });
    },
  });
  return { ...mainMutate };
};

export default usePost;
