import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const { user, loading } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["user", email],
    enabled: !!email && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${email}`);
      return data;
    },
  });
};
