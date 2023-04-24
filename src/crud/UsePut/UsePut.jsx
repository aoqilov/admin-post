import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import api from "services/api";
import queryBuilder from "services/querybuilder";
import storage from "services/storage";
const token = storage.get("token");

const UsePut = ({
  url,
  queryKeyName,
  params,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const queryClient = useQueryClient();

  const mainMutate = useMutation({
    mutationKey: queryKeyName,
    mutationFn: async (values) => {
      return await api
        .put(queryBuilder(url, params), values)
        .then(() => resetForm());
    },
    onSuccess: (value) => {
      onSuccess(value);
      message.success(value.statusText);
      queryClient.invalidateQueries({ queryKey: queryKeyName });
    },
    onError: (error) => {
      onError(error);
      message.error(error.message);
    },
  });
  return mainMutate;
};

export default UsePut;
