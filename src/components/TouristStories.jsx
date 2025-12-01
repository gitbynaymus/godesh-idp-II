import { useQuery } from "@tanstack/react-query";
import { Link} from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./shared/Loading";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import StoryList from "./Card/StoryList";
import Heading from "./shared/Heading";
import SubHeading from "./shared/SubHeading";

const TouristStories = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["random-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stories?random=4");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto w-11/12 max-w-[1440px]">
      <Heading>Tourist Stories</Heading>
      <SubHeading>
        Real stories from our happy travelers
      </SubHeading>
      <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stories.map((story) => (
          <StoryList key={story._id} story={story} />
        ))}
      </div>

      <div className="flex justify-between">
        <div></div>
        <Link
          to="/all-stories"
          className="group mt-10 flex items-center gap-1 pr-3 font-semibold text-green-600 duration-300 hover:text-blue-500"
        >
          All Stories
          <span className="duration-300 group-hover:translate-x-3">
            <MdKeyboardDoubleArrowRight size={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TouristStories;
