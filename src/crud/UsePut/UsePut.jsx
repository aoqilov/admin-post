import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import storage from "services/storage";
const token = storage.get("token");

const UsePut = ({ url, queryKey, id }) => {
  const queryClient = useQueryClient();

  const mainMutate = useMutation({
    mutationFn: ({ id, status }) => {
      return axios.put(
        `http://api.test.uz/api/v1/admin/posts/updateStatus/${id}?_l=uz`,
        { status },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
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

export default UsePut;
