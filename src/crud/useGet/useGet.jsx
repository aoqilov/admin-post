import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";
import storage from "services/storage";

const useGet = ({ url, queryKey }) => {
  const token = storage.get("token");

  const data = useQuery({
    queryKey: queryKey,
    queryFn: () => {
      return axios.get(`http://api.test.uz/api/v1/admin${url}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
  });
  return { ...data };
};

export default useGet;
