import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import StoryList from "../components/Card/StoryList";

const GuideDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: guide,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
// &status=approved
  const { data: stories=[], isLoading: storiesLoading } = useQuery({
    queryKey: ["stories", guide?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/stories?email=${guide?.email}`,
      );
      return res.data;
    },
  });

  

  if (isLoading || storiesLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading guide details.</p>
    );
  if (!guide) return <p className="text-center">No guide found.</p>;
  console.log(stories);
  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10">
      <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
        <img
          src={guide.image}
          alt={guide.name}
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{guide.name}</h2>
          <p className="text-gray-600">{guide.email}</p>
          <p className="text-sm text-gray-400">
            Joined: {new Date(guide.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-5 text-xl font-semibold">Stories by {guide.name}</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stories && stories.length > 0 ? (
            stories.map((story) => <StoryList key={story._id} story={story} />)
          ) : (
            <p className="text-gray-500 italic">No stories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
