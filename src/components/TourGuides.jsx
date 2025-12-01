import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./shared/Loading";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import GuideCard from "./Card/GuideCard";

const TourGuides = () => {
  const axiosSecure = useAxiosSecure();
  const { data: guides = [], isLoading } = useQuery({
    queryKey: ["random-guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role/guide?limit=4");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto pt-5 pb-10">
      <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {guides?.map((guide) => (
          <GuideCard guide={guide} key={guide._id} />
        ))}
      </div>
      <div className="mt-5 flex justify-between">
        <div></div>
        <Link
          to="/all-guides"
          className="group flex items-center gap-1 pr-3 font-semibold text-green-600 duration-300 hover:text-blue-500"
        >
          All Guides
          <span className="duration-300 group-hover:translate-x-3">
            <MdKeyboardDoubleArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TourGuides;
