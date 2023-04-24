import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "services/api";

const UseDelete = ({
  url,
  queryKeyName,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const queryClient = useQueryClient();

  const mainMutate = useMutation({
    mutationKey: queryKeyName,
    mutationFn: (id) => {
      return api.delete(`${url}/${id}`);
    },
    onSuccess: (value) => {
      onSuccess(value);
      message.destroy("deleteed");
      queryClient.invalidateQueries({ queryKey: queryKeyName });
    },
    onError: (error) => {
      onError(error);
      message.error(error.message);
    },
  });
  return mainMutate;
};

export default UseDelete;
