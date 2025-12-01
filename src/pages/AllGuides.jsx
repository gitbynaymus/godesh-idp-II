import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import GuideCard from "../components/Card/GuideCard";

const AllGuides = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: guides = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role/guide");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return (
      <div className="mt-10 text-center text-red-500">
        Failed to load guides. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10">
      <h1 className="mb-10 text-center text-3xl font-bold md:text-4xl">
        Meet Our Tour Guides
      </h1>

      {guides.length === 0 ? (
        <p className="text-center text-gray-500">
          No guides available at the moment.
        </p>
      ) : (
        <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {guides.map((guide) => (
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllGuides;
