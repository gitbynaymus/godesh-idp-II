import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useAuth } from "./useAuth";

const useRole = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure(`/users/role/${user.email}`);
        setRole(res.data.role);
      } catch (err) {
        console.error("Failed to fetch role", err);
        setRole(""); 
      } finally {
        setLoading(false); 
      }
    };

    fetchRole();
  }, [axiosSecure, user?.email]);

  return [role, loading];
};

export default useRole;
