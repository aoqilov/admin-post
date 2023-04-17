import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import storage from "services/storage";
const token = storage.get("token");

const UseDelete = ({ url, queryKey }) => {
  const queryClient = useQueryClient();

  const mainMutate = useMutation({
    mutationKey: queryKey,
    mutationFn: (id) => {
      return axios.delete(`http://api.test.uz/api/v1/admin${url}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: (value) => {
      message.success(value.statusText);
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return mainMutate;
};

export default UseDelete;
