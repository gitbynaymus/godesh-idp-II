import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import StoryList from "../components/Card/StoryList";

const AllStories = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: result = {}, isLoading } = useQuery({
    queryKey: ["all-stories", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/stories/all-stories", {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
    retry: 1,
  });

  const stories = result.data || [];
  const totalPages = result.totalPages || 1;

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto w-11/12 max-w-[1440px] py-10">
      <h2 className="mb-6 text-center text-3xl font-bold">All Stories</h2>

      <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stories.map((story) => (
          <StoryList key={story._id} story={story} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`rounded px-3 py-1 ${page === num + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllStories;
