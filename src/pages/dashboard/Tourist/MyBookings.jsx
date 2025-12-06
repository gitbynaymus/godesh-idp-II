import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useUser } from "../../../hooks/useUser";
import Loading from "../../../components/shared/Loading";
import toast from "react-hot-toast";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading: userLoading } = useUser();
  const navigate = useNavigate();
  const [guideMap, setGuideMap] = useState({});
  const [packageMap, setPackageMap] = useState({});
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch bookings
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", userData?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/?email=${userData?.email}`);
      return res.data;
    },
    enabled: !!userData?.email,
  });

  // Cancel booking mutation
  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId) => {
      return axiosSecure.delete(`/bookings/${bookingId}`);
    },
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    },
  });

  // Fetch guide and package info
  useEffect(() => {
    const fetchRelatedData = async () => {
      const guideIds = [...new Set(bookings.map((b) => b.guideId))];
      const packageIds = [...new Set(bookings.map((b) => b.packageId))];
      const newGuideMap = {};
      const newPackageMap = {};

      await Promise.all([
        ...guideIds.map(async (id) => {
          const res = await axiosSecure.get(`/users/${id}`);
          newGuideMap[id] = res.data.name;
        }),
        ...packageIds.map(async (id) => {
          const res = await axiosSecure.get(`/packages/${id}`);
          newPackageMap[id] = res.data;
        }),
      ]);

      setGuideMap(newGuideMap);
      setPackageMap(newPackageMap);
    };

    if (bookings.length) fetchRelatedData();
  }, [bookings, axiosSecure]);

  // if (isLoading || userLoading) return <Loading />;

  const filteredBookings = statusFilter
    ? bookings.filter((b) => b.status.toLowerCase() === statusFilter)
    : bookings;

  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10">
      {(isLoading || userLoading) && (
        <div className="flex h-screen items-center justify-center">
          <Loading fullscreen={false} />
        </div>
      )}
      {!isLoading && !userLoading && (
        <>
          <h2 className="mb-6 text-2xl font-bold">My Bookings</h2>

          <div className="mb-4">
            <label className="mr-2 font-medium">Filter by status:</label>
            <select
              className="input rounded border px-2 py-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="in review">In Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Package</th>
                  <th className="px-4 py-2 text-left">Guide</th>
                  <th className="px-4 py-2 text-left">Tour Date</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((booking) => {
                  const pkg = packageMap[booking.packageId];
                  return (
                    <tr key={booking._id}>
                      <td className="px-4 py-2">
                        {pkg?.packageName || "Loading..."}
                      </td>
                      <td className="px-4 py-2">
                        {guideMap[booking.guideId] || "Loading..."}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(booking.tourDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">$ {booking.price}</td>
                      <td className="px-4 py-2 font-semibold text-green-700 capitalize">
                        {booking.status.replace("in review", "In Review")}
                      </td>
                      <td className="space-x-2 px-4 py-2">
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                navigate(`/dashboard/payment/${booking._id}`)
                              }
                              className="btn btn-sm cursor-pointer rounded bg-accent px-2 py-1 text-xs text-white duration-300 hover:bg-green-500"
                            >
                              Pay
                            </button>
                            <button
                              onClick={() =>
                                cancelBookingMutation.mutate(booking._id)
                              }
                              className="btn btn-sm cursor-pointer rounded bg-red-500 px-2 py-1 text-xs text-white duration-300 hover:bg-red-600"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
